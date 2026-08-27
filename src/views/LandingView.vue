<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'

// Define the TypeScript interface for a Recipe
interface Recipe {
  id?: number
  slug: string
  title: string
  description: string
  image?: string
  prep_time?: number
  cook_time?: number
  categories?: string[] // <-- Hier haben wir die fehlenden Kategorien ergänzt
}

// State management for the API request
const recipes = ref<Recipe[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Helper: Assigns specific colors to categories
// <-- category als string definiert
const getCategoryBadgeClass = (category: string) => {
  // <-- Record<string, string> sagt TypeScript, dass hier mit Strings gesucht wird
  const colorMap: Record<string, string> = {
    // Meals (Blue/Purple tones)
    breakfast: 'bg-sky-50 text-sky-700 border-sky-200',
    lunch: 'bg-blue-50 text-blue-700 border-blue-200',
    dinner: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    snack: 'bg-purple-50 text-purple-700 border-purple-200',

    // Diets (Green tones)
    vegan: 'bg-green-50 text-green-700 border-green-200',
    vegetarian: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'low-carb': 'bg-lime-50 text-lime-700 border-lime-200',

    // Fitness/Goals (Red/Orange tones)
    'high-protein': 'bg-red-50 text-red-700 border-red-200',
    bulking: 'bg-orange-50 text-orange-700 border-orange-200',
    cutting: 'bg-rose-50 text-rose-700 border-rose-200',

    // Misc/Logistics (Yellow/Teal tones)
    quick: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'meal-prep-friendly': 'bg-teal-50 text-teal-700 border-teal-200',
    'one-pot': 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return colorMap[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}

// Fetch recipes automatically when the page loads
onMounted(async () => {
  document.title = 'PrepYourMeal 🥗'
  try {
    isLoading.value = true
    const response = await api.get('/recipes?random=true&per_page=3')
    recipes.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch recipes:', err)
    error.value = 'Could not load recipes at this time. Please ensure the backend is running.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-16 pb-20 w-full px-4">
    <header
      class="max-w-4xl bg-white px-6 py-12 md:py-16 md:px-12 rounded-3xl shadow-sm border-t-[8px] border-primary-green text-center mt-12 relative"
    >
      <img
        src="@/assets/images/prepyourmeal_logo.png"
        alt="PrepYourMeal Logo"
        class="max-w-[180px] md:max-w-[220px] h-auto mb-10 mx-auto block drop-shadow-sm"
      />

      <h1
        class="text-4xl md:text-5xl mb-6 text-dark-green tracking-tight font-extrabold leading-tight"
      >
        {{ $t('landing.hero_title') }}
        <span class="text-accent-gold block mt-2 text-3xl md:text-4xl">PrepYourMeal</span>
      </h1>

      <p class="text-lg md:text-xl leading-relaxed mb-10 text-gray-500 max-w-2xl mx-auto">
        {{ $t('landing.hero_subtitle') }}
      </p>

      <div class="mt-4">
        <RouterLink
          to="/login"
          class="inline-block bg-primary-green text-white font-bold text-lg py-4 px-10 rounded-2xl hover:bg-accent-gold hover:ring-accent-gold/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ring-4 ring-primary-green/20"
        >
          {{ $t('landing.cta_button') }}
        </RouterLink>
      </div>
    </header>

    <section class="w-full max-w-6xl">
      <div class="flex items-center gap-4 mb-8">
        <h2 class="text-3xl font-bold text-dark-green m-0">
          {{ $t('landing.latest_recipes') }}
        </h2>
        <div
          class="h-1 flex-grow bg-gradient-to-r from-accent-gold/40 to-transparent rounded-full max-w-xs"
        ></div>
      </div>

      <div
        v-if="isLoading"
        class="text-center p-12 bg-white rounded-2xl text-gray-500 shadow-sm border border-gray-100"
      >
        <p>{{ $t('landing.loading') }}</p>
      </div>

      <div
        v-else-if="error"
        class="text-center p-12 bg-red-50 rounded-2xl text-red-600 border border-red-200 shadow-sm"
      >
        <p>{{ error }}</p>
      </div>

      <div
        v-else-if="recipes.length === 0"
        class="text-center p-12 bg-white rounded-2xl text-gray-500 shadow-sm border border-gray-100"
      >
        <p>{{ $t('landing.loading') }}</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouterLink
          v-for="recipe in recipes"
          :key="recipe.slug"
          :to="`/recipe/${recipe.slug}`"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-green/30 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
        >
          <div
            class="h-56 bg-bg-cream flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          >
            <img
              v-if="recipe.image"
              :src="recipe.image"
              :alt="recipe.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="text-5xl opacity-50">🍽️</div>
          </div>

          <div class="p-6 flex-grow flex flex-col">
            <h3
              class="text-xl mb-3 text-dark-green font-bold group-hover:text-primary-green transition-colors"
            >
              {{ recipe.title }}
            </h3>

            <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {{ recipe.description }}
            </p>

            <div class="mt-auto flex flex-col gap-4">
              <div
                v-if="recipe.categories && recipe.categories.length > 0"
                class="flex flex-wrap gap-2"
              >
                <span
                  v-for="category in recipe.categories"
                  :key="category"
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm',
                    getCategoryBadgeClass(category),
                  ]"
                >
                  {{ $t(`categories.${category}`) }}
                </span>
              </div>

              <div
                v-if="recipe.prep_time || recipe.cook_time"
                class="flex items-center text-sm text-gray-500 space-x-2 border-t border-gray-100 pt-4"
              >
                <svg
                  class="w-4 h-4 mr-1 text-primary-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                <span v-if="recipe.prep_time">
                  {{ $t('landing.prep_time', { prep: recipe.prep_time }) }}
                </span>

                <span v-if="recipe.prep_time && recipe.cook_time" class="text-gray-300">|</span>

                <span v-if="recipe.cook_time">
                  {{ $t('landing.cook_time', { cook: recipe.cook_time }) }}
                </span>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
