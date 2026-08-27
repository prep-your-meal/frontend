<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
    <!-- Back Navigation -->
    <button
      @click="goBack"
      class="mb-6 flex items-center text-primary-green hover:text-dark-green transition-colors font-medium cursor-pointer"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      {{ $t('recipe_detail.back_button') }}
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20 text-gray-500">
      <svg
        class="animate-spin h-8 w-8 text-primary-green"
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
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm"
    >
      <p class="font-bold">{{ $t('recipe_detail.error_title') }}</p>
      <p>{{ error }}</p>
    </div>

    <!-- Recipe Content -->
    <div
      v-else-if="recipe"
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <!-- Top Section: Image & Basic Info -->
      <div class="flex flex-col md:flex-row">
        <!-- Recipe Image -->
        <div class="md:w-1/2">
          <img
            v-if="recipe.image_url || recipe.image"
            :src="recipe.image_url || recipe.image"
            :alt="recipe.title"
            class="w-full h-72 md:h-full object-cover"
          />
          <div
            v-else
            class="w-full h-72 md:h-full bg-gray-100 flex items-center justify-center text-gray-400"
          >
            {{ $t('recipe_detail.no_image') }}
          </div>
        </div>

        <!-- Recipe Title, Times & Macros -->
        <div class="md:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
          <!-- Title & Description -->
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{{ recipe.title }}</h1>
          <p class="text-gray-600 mb-6 leading-relaxed">{{ recipe.description }}</p>
          <!-- Category Badges -->
          <div
            v-if="recipe.categories && recipe.categories.length > 0"
            class="flex flex-wrap gap-2 mb-3"
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

          <!-- Times Section -->
          <div class="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <!-- Prep Time -->
            <div v-if="recipe.prep_time" class="flex items-center">
              <!-- Icon in primary-green -->
              <svg
                class="w-5 h-5 mr-2 text-primary-green"
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
              <span class="text-sm font-medium">{{
                $t('recipe_detail.prep_time', { cook: recipe.prep_time })
              }}</span>
            </div>

            <!-- Cook Time -->
            <div v-if="recipe.cook_time" class="flex items-center">
              <!-- Icon in primary-green -->
              <svg
                class="w-5 h-5 mr-2 text-primary-green"
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
              <span class="text-sm font-medium">{{
                $t('recipe_detail.cook_time', { cook: recipe.cook_time })
              }}</span>
            </div>
          </div>

          <!-- Macro Nutrients Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Kalorien (Neutral/Cream) -->
            <div class="bg-bg-cream p-4 rounded-2xl border border-gray-100 text-center">
              <span class="block text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">{{
                $t('recipe_detail.macros.calories')
              }}</span>
              <span class="block text-2xl font-bold text-dark-green">{{
                recipe.nutrition?.calories || recipe.calories || 0
              }}</span>
            </div>
            <!-- Protein (Primary Green) -->
            <div
              class="bg-primary-green/10 p-4 rounded-2xl border border-primary-green/20 text-center"
            >
              <span
                class="block text-sm text-primary-green font-medium uppercase tracking-wider mb-1"
                >{{ $t('recipe_detail.macros.protein') }}</span
              >
              <span class="block text-2xl font-bold text-dark-green"
                >{{ recipe.nutrition?.protein_g || recipe.protein || 0 }}g</span
              >
            </div>
            <!-- Kohlenhydrate (Accent Gold) -->
            <div class="bg-accent-gold/10 p-4 rounded-2xl border border-accent-gold/20 text-center">
              <span
                class="block text-sm text-accent-gold font-medium uppercase tracking-wider mb-1"
                >{{ $t('recipe_detail.macros.carbs') }}</span
              >
              <span class="block text-2xl font-bold text-dark-green"
                >{{ recipe.nutrition?.carbs_g || recipe.carbs || 0 }}g</span
              >
            </div>
            <!-- Fett (Dark Green) -->
            <div class="bg-dark-green/10 p-4 rounded-2xl border border-dark-green/20 text-center">
              <span
                class="block text-sm text-dark-green font-medium uppercase tracking-wider mb-1"
                >{{ $t('recipe_detail.macros.fat') }}</span
              >
              <span class="block text-2xl font-bold text-dark-green"
                >{{ recipe.nutrition?.fat_g || recipe.fat || 0 }}g</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Ingredients & Instructions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-100">
        <!-- Ingredients List -->
        <div class="lg:col-span-1 p-6 lg:p-10 bg-bg-cream/40 border-r border-gray-100">
          <h2 class="text-xl font-bold text-dark-green mb-6">
            {{ $t('recipe_detail.ingredients') }}
          </h2>
          <!-- space-y-3 entfernt, flex-col hinzugefügt für sauberen Aufbau -->
          <ul class="flex flex-col">
            <li
              v-for="(item, index) in recipe.ingredients"
              :key="index"
              class="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
            >
              <span class="text-gray-600 pr-4 leading-relaxed">{{ item.name }}</span>

              <span
                class="shrink-0 whitespace-nowrap font-medium text-dark-green bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100 text-sm"
              >
                {{ formatAmount(item.amount) }} {{ item.unit }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Instructions (Parsed Markdown) -->
        <div class="lg:col-span-2 p-6 lg:p-10">
          <h2 class="text-xl font-bold text-dark-green mb-6">
            {{ $t('recipe_detail.instructions') }}
          </h2>
          <div
            class="prose prose-green max-w-none text-gray-700 marker:text-primary-green"
            v-html="parsedInstructionsHtml"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '../services/api'
import axios from 'axios'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// --- Type Definitions ---
interface RecipeIngredient {
  name: string
  amount: number | string
  unit: string
}

interface NutritionInfo {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

interface Recipe {
  id: number
  title: string
  description: string
  image_url?: string
  image?: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  prep_time?: number // Added property
  cook_time?: number // Added property
  categories?: string[] // Added property
  nutrition?: NutritionInfo
  ingredients?: RecipeIngredient[]
  instructions?: string
}

// --- Router & i18n Setup ---
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// --- State Management ---
const recipe = ref<Recipe | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

// Store the original page title to restore it later
const originalPageTitle = document.title

// --- Methods & Helpers ---
const goBack = () => {
  router.back()
}

// Helper: Removes unnecessary decimal zeros (e.g., "1.00" -> 1, but "1.5" -> 1.5)
const formatAmount = (amount: number | string) => {
  if (!amount) return ''
  return Number(amount)
}

// Helper: Assigns specific colors to category badges
const getCategoryBadgeClass = (category: string) => {
  // Important: Always write out full Tailwind class names
  const colorMap: Record<string, string> = {
    // Meals
    breakfast: 'bg-sky-50 text-sky-700 border-sky-200',
    lunch: 'bg-blue-50 text-blue-700 border-blue-200',
    dinner: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    snack: 'bg-purple-50 text-purple-700 border-purple-200',

    // Diets
    vegan: 'bg-green-50 text-green-700 border-green-200',
    vegetarian: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'low-carb': 'bg-lime-50 text-lime-700 border-lime-200',

    // Fitness/Goals
    'high-protein': 'bg-red-50 text-red-700 border-red-200',
    bulking: 'bg-orange-50 text-orange-700 border-orange-200',
    cutting: 'bg-rose-50 text-rose-700 border-rose-200',

    // Misc/Logistics
    quick: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'meal-prep-friendly': 'bg-teal-50 text-teal-700 border-teal-200',
    'one-pot': 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return colorMap[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}

// --- Computed Properties ---
const parsedInstructionsHtml = computed(() => {
  if (!recipe.value?.instructions) return ''
  const rawHtml = marked.parse(recipe.value.instructions) as string
  return DOMPurify.sanitize(rawHtml)
})

// --- Lifecycle Hooks ---
onMounted(async () => {
  const recipeId = route.params.id

  isLoading.value = true
  error.value = null

  try {
    const response = await api.get(`/recipes/${recipeId}`)
    recipe.value = response.data.data || response.data

    // Update the browser tab title to the recipe name
    if (recipe.value?.title) {
      document.title = `${recipe.value.title} | PrepYourMeal`
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || t('recipe_detail.error_not_found')
    } else {
      error.value = t('recipe_detail.error_fallback')
    }
    console.error('Error fetching recipe:', err)
  } finally {
    isLoading.value = false
  }
})

// Restore original document title upon leaving the component
onUnmounted(() => {
  document.title = originalPageTitle
})
</script>
