<template>
  <div class="max-w-6xl w-full mx-auto px-4 pb-8 sm:pb-12 flex-grow flex flex-col">
    <!-- 1. Spacer: Safely pushes the content below the fixed TopNav without relying on padding -->
    <div class="w-full h-24 md:h-32 shrink-0"></div>

    <!-- 2. Header Section -->
    <div
      class="mb-8 md:mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <h1
          class="text-4xl md:text-5xl font-extrabold text-dark-green mb-3 tracking-tight relative z-10"
        >
          {{ $t('recipes.title') }}
        </h1>
        <!-- UI Polish: Replaced text-gray-500 with text-dark-green/70 for better harmony on cream bg -->
        <p class="text-dark-green/70 text-lg max-w-xl relative z-10 font-medium">
          {{ $t('recipes.subtitle') }}
        </p>
      </div>
    </div>

    <!-- 3. Search & Filter Bar (Floating Island) -->
    <div
      class="sticky top-4 md:top-[104px] z-40 bg-white/90 backdrop-blur-xl py-5 mb-8 border border-gray-100 shadow-xl shadow-dark-green/5 rounded-3xl px-5 sm:px-6"
    >
      <div class="flex flex-col gap-6 w-full">
        <!-- Search Input -->
        <div class="relative w-full shrink-0 group">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-green transition-colors pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            v-model="searchQuery"
            @keyup.enter="fetchRecipes"
            type="text"
            :placeholder="$t('recipes.search_placeholder')"
            class="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-bg-cream/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:bg-white transition-all shadow-inner text-dark-green"
          />
        </div>

        <!-- Grouped Category Filters -->
        <div class="w-full flex flex-col md:flex-row gap-6 md:gap-12">
          <div
            v-for="group in categoryGroups"
            :key="group.titleKey"
            class="flex flex-col gap-3 w-full md:w-auto"
          >
            <div class="flex items-center gap-3 px-1">
              <h4 class="text-xs font-bold text-dark-green/60 uppercase tracking-wider">
                {{ $t(group.titleKey) }}
              </h4>
              <div class="h-px flex-grow bg-gray-200/60 rounded-full"></div>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <button
                v-for="cat in group.items"
                :key="cat.value"
                @click="toggleCategory(cat.value)"
                :class="[
                  'whitespace-nowrap shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2',
                  selectedCategory === cat.value
                    ? 'bg-primary-green text-white border-primary-green shadow-md scale-105'
                    : 'bg-white text-dark-green/70 border-gray-200 hover:border-primary-green hover:text-primary-green hover:shadow-sm',
                ]"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ $t(cat.labelKey) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. States: Loading -->
    <div
      v-if="isLoading"
      class="flex flex-col justify-center items-center py-24 text-dark-green/50"
    >
      <svg
        class="animate-spin h-10 w-10 text-primary-green mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p class="font-medium animate-pulse">Lade Rezepte...</p>
    </div>

    <!-- 4. States: Error -->
    <div
      v-else-if="error"
      class="text-center p-8 bg-red-50 rounded-2xl text-red-600 border border-red-100 shadow-sm max-w-2xl mx-auto mt-10"
    >
      <div class="text-4xl mb-3">😕</div>
      <p class="font-medium">{{ error }}</p>
      <button
        @click="fetchRecipes"
        class="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition-colors"
      >
        Erneut versuchen
      </button>
    </div>

    <!-- 4. States: Empty Results -->
    <div
      v-else-if="recipes.length === 0"
      class="text-center py-20 px-4 bg-white rounded-3xl border border-gray-100 shadow-sm"
    >
      <div class="text-6xl mb-6">🔍</div>
      <h3 class="text-2xl font-bold text-dark-green mb-2">
        {{ $t('recipes.no_results') }}
      </h3>
      <p class="text-dark-green/60 max-w-md mx-auto">
        {{ $t('recipes.no_results_desc') }}
      </p>
      <button
        @click="resetFilters"
        class="mt-8 px-6 py-2.5 bg-primary-green text-white font-bold rounded-xl hover:bg-dark-green transition-colors"
      >
        Filter zurücksetzen
      </button>
    </div>

    <!-- 5. Recipe Grid -->
    <TransitionGroup
      v-else
      name="recipe-list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <RouterLink
        v-for="recipe in recipes"
        :key="recipe.slug || recipe.id"
        :to="`/recipe/${recipe.slug}`"
        class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-green/30 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
      >
        <!-- Image Container -->
        <div
          class="h-56 bg-gray-100 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
        >
          <img
            v-if="recipe.image || recipe.image_url"
            :src="recipe.image || recipe.image_url"
            :alt="recipe.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div v-else class="text-5xl opacity-50">🍽️</div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <button
            @click.prevent
            class="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm z-10"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Card Content -->
        <div class="p-6 flex-grow flex flex-col">
          <h3
            class="text-xl mb-3 text-dark-green font-bold group-hover:text-primary-green transition-colors line-clamp-2"
          >
            {{ recipe.title }}
          </h3>
          <!-- UI Polish: Text slightly warmer to match the new theme -->
          <p class="text-dark-green/60 text-sm leading-relaxed mb-6 line-clamp-2">
            {{ recipe.description }}
          </p>

          <div class="mt-auto flex flex-col gap-4">
            <div
              v-if="recipe.categories && recipe.categories.length > 0"
              class="flex flex-wrap gap-2"
            >
              <span
                v-for="cat in recipe.categories"
                :key="cat"
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm',
                  getCategoryBadgeClass(cat),
                ]"
              >
                {{ $t(`categories.${cat}`, cat) }}
              </span>
            </div>

            <!-- Time Info -->
            <div
              v-if="recipe.prep_time || recipe.cook_time"
              class="flex items-center text-sm text-dark-green/50 space-x-3 border-t border-gray-100 pt-4"
            >
              <div v-if="recipe.prep_time" class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1.5 text-primary-green shrink-0"
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
                <span>{{ $t('landing.prep_time', { prep: recipe.prep_time }) }}</span>
              </div>
              <span v-if="recipe.prep_time && recipe.cook_time" class="text-gray-200">|</span>
              <div v-if="recipe.cook_time" class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1.5 text-secondary-rust shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  ></path>
                </svg>
                <span>{{ $t('landing.cook_time', { cook: recipe.cook_time }) }}</span>
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../services/api'
import { getCategoryBadgeClass } from '../utils/theme'

// --- Interfaces ---
interface Recipe {
  id?: number
  slug: string
  title: string
  description: string
  image?: string
  image_url?: string
  prep_time?: number
  cook_time?: number
  categories?: string[]
}

// --- State Management ---
const recipes = ref<Recipe[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Search & Filter State
const searchQuery = ref('')
const selectedCategory = ref<string>('all')

const categoryGroups = [
  {
    titleKey: 'recipes.filters.groups.basis',
    items: [{ labelKey: 'recipes.filters.all', value: 'all', icon: '🍽️' }],
  },
  {
    titleKey: 'recipes.filters.groups.diet',
    items: [
      { labelKey: 'categories.vegan', value: 'vegan', icon: '🌱' },
      { labelKey: 'categories.vegetarian', value: 'vegetarian', icon: '🧀' },
    ],
  },
  {
    titleKey: 'recipes.filters.groups.macros',
    items: [
      { labelKey: 'categories.high-protein', value: 'high-protein', icon: '💪' },
      { labelKey: 'categories.low-carb', value: 'low-carb', icon: '🥑' },
      { labelKey: 'categories.quick', value: 'quick', icon: '⏱️' },
    ],
  },
]

// --- Methods ---
const toggleCategory = (value: string) => {
  selectedCategory.value = value
  fetchRecipes()
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  fetchRecipes()
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchRecipes()
  }, 400)
})

const fetchRecipes = async () => {
  isLoading.value = true
  error.value = null

  try {
    let endpoint = '/recipes?'

    if (searchQuery.value.trim()) {
      endpoint += `search=${encodeURIComponent(searchQuery.value.trim())}&`
    }
    if (selectedCategory.value !== 'all') {
      endpoint += `category=${selectedCategory.value}&`
    }

    const response = await api.get(endpoint)
    recipes.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch recipes:', err)
    error.value = 'Hoppla! Die Rezepte konnten gerade nicht geladen werden.'
  } finally {
    isLoading.value = false
  }
}

// --- Lifecycle Hooks ---
onMounted(() => {
  document.title = 'Entdecken | PrepYourMeal'
  fetchRecipes()
})
</script>

<style scoped>
.recipe-list-move,
.recipe-list-enter-active,
.recipe-list-leave-active {
  transition: all 0.4s ease;
}

.recipe-list-enter-from,
.recipe-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
