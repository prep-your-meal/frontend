<template>
  <div class="max-w-6xl w-full mx-auto md:pb-4 flex-grow flex flex-col md:px-4">
    <!-- Spacer -->
    <div class="w-full h-4 md:h-28 shrink-0"></div>

    <div class="flex flex-col flex-grow">
      <!-- Header Area -->
      <div class="md:hidden px-4 pt-3 pb-2 z-10 relative">
        <MobileHeader :showBack="true" />
      </div>

      <!-- Loading State -->
      <LoadingState
        v-if="isLoading"
        containerClass="py-20 bg-white rounded-3xl shadow-sm mx-4 md:mx-0"
        spinnerSize="h-8 w-8"
      />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 text-red-700 p-8 rounded-3xl shadow-sm text-center mt-4 mx-4 md:mx-0"
      >
        <p class="font-bold text-xl mb-2">{{ $t('recipe_detail.error_title') }}</p>
        <p>{{ error }}</p>
      </div>

      <!-- Recipe Content -->
      <div
        v-else-if="recipe"
        class="flex flex-col flex-grow mt-2 md:mt-0 bg-white md:rounded-3xl md:shadow-sm md:border md:border-gray-100 overflow-hidden -mb-20 pb-20 md:mb-0 md:pb-0"
      >
        <!-- Top Section -->
        <div class="flex flex-col md:flex-row items-stretch md:border-b md:border-gray-100">
          <!-- Recipe Image -->
          <div class="relative w-full md:w-1/2 h-72 md:h-auto shrink-0 bg-gray-200 overflow-hidden">
            <img
              v-if="recipe.image_url || recipe.image"
              :src="recipe.image_url || recipe.image"
              :alt="recipe.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              v-else
              class="absolute inset-0 w-full h-full flex items-center justify-center text-gray-400"
            >
              {{ $t('recipe_detail.no_image') }}
            </div>
          </div>

          <!-- Recipe Title, Times & Macros -->
          <div class="w-full md:w-1/2 flex flex-col justify-center px-4 py-8 md:p-6 lg:p-10">
            <!-- Title & Description -->
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{{ recipe.title }}</h1>
            <p class="text-gray-600 mb-6 leading-relaxed">{{ recipe.description }}</p>

            <!-- Category Badges -->
            <div
              v-if="recipe.categories && recipe.categories.length > 0"
              class="flex flex-wrap gap-2 mb-8"
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
            <div
              class="flex flex-wrap items-center justify-center gap-6 mb-8 text-gray-600 border-y border-gray-100 py-6"
            >
              <!-- Prep Time -->
              <div v-if="recipe.prep_time" class="flex items-center">
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
                  $t('recipe_detail.prep_time', { prep: recipe.prep_time })
                }}</span>
              </div>
              <!-- Cook Time -->
              <div v-if="recipe.cook_time" class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-secondary-rust"
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
                </svg>
                <span class="text-sm font-medium">{{
                  $t('recipe_detail.cook_time', { cook: recipe.cook_time })
                }}</span>
              </div>
            </div>

            <!-- Macro Nutrients Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                <span
                  class="block text-sm text-gray-500 font-medium uppercase tracking-wider mb-1"
                  >{{ $t('recipe_detail.macros.calories') }}</span
                >
                <span class="block text-2xl font-bold text-dark-green">{{
                  recipe.nutrition?.calories || recipe.calories || 0
                }}</span>
              </div>
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
              <div
                class="bg-accent-gold/10 p-4 rounded-2xl border border-accent-gold/20 text-center"
              >
                <span
                  class="block text-sm text-accent-gold font-medium uppercase tracking-wider mb-1"
                  >{{ $t('recipe_detail.macros.carbs') }}</span
                >
                <span class="block text-2xl font-bold text-dark-green"
                  >{{ recipe.nutrition?.carbs_g || recipe.carbs || 0 }}g</span
                >
              </div>
              <div
                class="bg-secondary-rust/10 p-4 rounded-2xl border border-secondary-rust/20 text-center"
              >
                <span
                  class="block text-sm text-secondary-rust font-medium uppercase tracking-wider mb-1"
                  >{{ $t('recipe_detail.macros.fat') }}</span
                >
                <span class="block text-2xl font-bold text-dark-green"
                  >{{ recipe.nutrition?.fat_g || recipe.fat || 0 }}g</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-gray-100 md:border-transparent"
        >
          <!-- Ingredients List -->
          <div
            class="lg:col-span-1 px-4 py-8 md:p-6 lg:p-10 bg-bg-cream/40 md:border-r md:border-gray-100"
          >
            <h2 class="text-xl font-bold text-dark-green mb-6">
              {{ $t('recipe_detail.ingredients') }}
            </h2>
            <ul class="flex flex-col">
              <li
                v-for="(item, index) in recipe.ingredients"
                :key="index"
                class="flex justify-between items-center py-3 border-b border-gray-200 md:border-gray-200 last:border-0"
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

          <!-- Instructions -->
          <div class="lg:col-span-2 px-4 pt-8 pb-0 md:p-6 lg:p-10">
            <h2 class="text-xl font-bold text-dark-green mb-6">
              {{ $t('recipe_detail.instructions') }}
            </h2>
            <div
              class="prose prose-green max-w-none text-gray-700 marker:text-primary-green [&>*:last-child]:mb-0"
              v-html="parsedInstructionsHtml"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getCategoryBadgeClass } from '../utils/theme'
import api from '../services/api'
import LoadingState from '@/components/ui/LoadingState.vue'
import MobileHeader from '@/components/ui/MobileHeader.vue'
import axios from 'axios'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useRecipeStore } from '@/stores/recipes'
import type { Recipe } from '@/stores/recipes'

const route = useRoute()
const { t } = useI18n()
const recipeStore = useRecipeStore()

const recipe = ref<Recipe | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

const originalPageTitle = document.title

const formatAmount = (amount: number | string) => {
  if (!amount) return ''
  return Number(amount)
}

const parsedInstructionsHtml = computed(() => {
  if (!recipe.value?.instructions) return ''
  const rawHtml = marked.parse(recipe.value.instructions) as string
  return DOMPurify.sanitize(rawHtml)
})

onMounted(async () => {
  const recipeIdentifier = route.params.id as string

  error.value = null

  // Retrieve recipe from Pinia cache if it was loaded previously
  if (recipeStore.detailedRecipes[recipeIdentifier]) {
    recipe.value = recipeStore.detailedRecipes[recipeIdentifier]
    if (recipe.value?.title) {
      document.title = `${recipe.value.title} | PrepYourMeal`
    }
    return // Skip API call entirely
  }

  // Fetch from API if not cached
  isLoading.value = true
  try {
    const response = await api.get(`/recipes/${recipeIdentifier}`)
    recipe.value = response.data.data || response.data

    // Save the retrieved recipe to Pinia cache for future visits
    if (recipe.value) {
      recipeStore.detailedRecipes[recipeIdentifier] = recipe.value
    }

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

onUnmounted(() => {
  document.title = originalPageTitle
})
</script>
