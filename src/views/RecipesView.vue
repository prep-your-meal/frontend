<template>
  <div class="max-w-6xl w-full mx-auto px-4 pb-8 sm:pb-12 flex-grow flex flex-col">
    <!-- 1. Spacer -->
    <div class="w-full h-4 md:h-28 shrink-0"></div>

    <!-- 2. Header Text (Top Half - Scrolls normally) -->
    <!-- UI Polish: Centered text alignment (text-center) and layout (items-center) -->
    <div
      class="bg-white px-6 sm:px-10 pt-6 md:pt-10 pb-6 border-t border-x border-gray-100 rounded-t-3xl z-10 transition-opacity duration-300 relative flex flex-col items-center text-center"
    >
      <!-- Mobile Branding Component -->
      <MobileHeader />

      <h1 class="text-4xl md:text-5xl font-extrabold text-dark-green mb-3 tracking-tight">
        {{ $t('recipes.title') }}
      </h1>
      <p class="text-dark-green/60 text-lg max-w-xl font-medium">
        {{ $t('recipes.subtitle') }}
      </p>
    </div>

    <!-- 3. Sticky Search Island (Bottom Half - Detaches and sticks infinitely) -->
    <div
      class="sticky top-4 md:top-[104px] z-40 mb-10 bg-white/95 backdrop-blur-xl px-4 sm:px-6 py-5 border transition-all duration-500"
      :class="[
        isScrolled
          ? 'rounded-3xl border-gray-100 shadow-xl shadow-dark-green/5'
          : 'rounded-b-3xl border-t-transparent border-b-gray-100 border-x-gray-100 shadow-sm',
      ]"
    >
      <div class="flex flex-col gap-4 w-full">
        <!-- Search Input & Filter Toggle Button -->
        <div class="flex gap-3 w-full items-center">
          <div class="relative w-full shrink group">
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

          <!-- Filter Toggle Button -->
          <button
            @click="isFilterOpen = !isFilterOpen"
            class="shrink-0 flex items-center justify-center h-[52px] px-4 md:px-6 bg-bg-cream/50 text-dark-green rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green transition-colors relative gap-2.5"
            :class="{
              'bg-primary-green text-white border-primary-green':
                isFilterOpen || activeFilterCount > 0,
            }"
          >
            <div
              v-if="activeFilterCount > 0 && !isFilterOpen"
              class="absolute top-2 right-2 md:right-3 w-3 h-3 bg-secondary-rust rounded-full border-2 border-white flex items-center justify-center"
            ></div>
            <span
              v-if="activeFilterCount > 0 && !isFilterOpen"
              class="absolute -top-2 -right-2 bg-secondary-rust text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white md:hidden"
            >
              {{ activeFilterCount }}
            </span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            <span class="hidden md:block font-bold text-sm">Filter</span>
          </button>
        </div>

        <!-- Quick Filters Row (Visible when full menu is CLOSED) -->
        <div
          v-show="!isFilterOpen"
          class="flex gap-2.5 overflow-x-auto scrollbar-hide w-full pt-1 pb-1"
        >
          <button
            v-for="cat in quickFilters"
            :key="cat.value"
            @click="toggleCategory(cat.value)"
            :class="[
              'whitespace-nowrap shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2',
              isCategoryActive(cat.value)
                ? 'bg-primary-green text-white border-primary-green shadow-md scale-105'
                : 'bg-white text-dark-green/70 border-gray-200 hover:border-primary-green hover:text-primary-green hover:shadow-sm',
            ]"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ $t(cat.labelKey) }}</span>
          </button>
        </div>

        <!-- Full Grouped Category Grid (Visible when full menu is OPEN) -->
        <div
          v-show="isFilterOpen"
          class="flex w-full flex-col gap-6 pt-4 pb-2 transition-all duration-300 border-t border-gray-100/50 mt-2"
        >
          <div class="flex flex-col md:flex-row md:flex-wrap gap-8">
            <div
              v-for="group in categoryGroups"
              :key="group.titleKey"
              class="flex flex-col gap-3 w-full md:w-auto"
            >
              <div class="flex items-center gap-3 px-1">
                <h4 class="text-xs font-bold text-dark-green/60 uppercase tracking-wider">
                  {{ $t(group.titleKey) }}
                </h4>
                <div class="h-px flex-grow bg-gray-200/60 rounded-full md:hidden"></div>
              </div>

              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="cat in group.items"
                  :key="cat.value"
                  @click="toggleCategory(cat.value)"
                  :class="[
                    'whitespace-nowrap shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2',
                    isCategoryActive(cat.value)
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

          <!-- Filter Actions -->
          <div class="flex justify-end pt-4 border-t border-gray-100/50">
            <button
              @click="resetFilters"
              class="text-sm font-bold text-gray-400 hover:text-dark-green transition-colors px-4 py-2"
            >
              {{ $t('recipes.filters.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. States: Loading -->
    <LoadingState v-if="isLoading" :text="$t('landing.loading')" />

    <!-- 4. States: Error -->
    <div
      v-else-if="error"
      class="text-center p-8 bg-red-50 rounded-2xl text-red-600 border border-red-100 shadow-sm max-w-2xl mx-auto mt-10"
    >
      <div class="text-4xl mb-3">😕</div>
      <p class="font-medium">{{ error }}</p>
      <!-- UI Polish: Use i18n for the retry button -->
      <button
        @click="fetchRecipes"
        class="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition-colors"
      >
        {{ $t('landing.retry') }}
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
        {{ $t('recipes.filters.clear') }}
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

        <div class="p-6 flex-grow flex flex-col">
          <h3
            class="text-xl mb-3 text-dark-green font-bold group-hover:text-primary-green transition-colors line-clamp-2"
          >
            {{ recipe.title }}
          </h3>
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
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n' // <-- Importiere useI18n
import api from '../services/api'
import { getCategoryBadgeClass } from '../utils/theme'
import LoadingState from '@/components/ui/LoadingState.vue'
import MobileHeader from '@/components/ui/MobileHeader.vue'

const { t } = useI18n()

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

interface FilterItem {
  labelKey: string
  value: string
  icon: string
}

interface FilterGroup {
  titleKey: string
  items: FilterItem[]
}

const recipes = ref<Recipe[]>([])
const categoryGroups = ref<FilterGroup[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])

const isFilterOpen = ref(false)
const isScrolled = ref(false)

const activeFilterCount = computed(() => selectedCategories.value.length)

// Evaluates true if a category is actively selected
const isCategoryActive = (value: string) => {
  return selectedCategories.value.includes(value)
}

// "All" is removed. These are the default top filters.
const quickFilterKeys = ['vegan', 'high-protein', 'quick', 'meal-prep-friendly']

const quickFilters = computed(() => {
  const items: FilterItem[] = []
  const keysToShow = [...quickFilterKeys]

  selectedCategories.value.forEach((cat) => {
    if (!keysToShow.includes(cat)) {
      keysToShow.splice(0, 0, cat) // Puts active custom filters at the very beginning of the row
    }
  })

  keysToShow.forEach((key) => {
    for (const group of categoryGroups.value) {
      const found = group.items.find((i) => i.value === key)
      if (found && !items.some((item) => item.value === found.value)) {
        items.push(found)
        break
      }
    }
  })
  return items
})

const iconMapping: Record<string, string> = {
  breakfast: '🥐',
  lunch: '🥪',
  dinner: '🍽️',
  snack: '🍎',
  vegan: '🌱',
  vegetarian: '🧀',
  keto: '🥩',
  'low-carb': '🥑',
  'gluten-free': '🌾',
  'dairy-free': '🥛',
  pescatarian: '🐟',
  'high-protein': '💪',
  bulking: '🍚',
  cutting: '✂️',
  balanced: '⚖️',
  'meal-prep-friendly': '🍱',
  quick: '⏱️',
  'one-pot': '🥘',
  'family-friendly': '👨‍👩‍👧‍👦',
  nuts: '🥜',
  soy: '🫘',
  shellfish: '🦐',
  eggs: '🥚',
  lactose: '🥛',
  gluten: '🍞',
}

const groupKeyMapping: Record<string, string> = {
  meal_types: 'recipes.filters.groups.meal_types',
  diets: 'recipes.filters.groups.diets',
  fitness_profiles: 'recipes.filters.groups.fitness',
  logistics: 'recipes.filters.groups.logistics',
  allergies: 'recipes.filters.groups.allergies',
}

const fetchCategories = async () => {
  try {
    const response = await api.get('/meta/categories')
    const data = response.data.data || response.data

    // The "Basis" group is completely removed
    const groups: FilterGroup[] = []

    for (const [groupKey, itemsArray] of Object.entries(data)) {
      const mappedItems = (itemsArray as string[]).map((val) => ({
        labelKey: `categories.${val}`,
        value: val,
        icon: iconMapping[val] || '🏷️',
      }))

      groups.push({
        titleKey: groupKeyMapping[groupKey] || `recipes.filters.groups.${groupKey}`,
        items: mappedItems,
      })
    }
    categoryGroups.value = groups
  } catch (err) {
    console.error('Failed to fetch meta categories:', err)
  }
}

// Standard multi-select toggle
const toggleCategory = (value: string) => {
  const index = selectedCategories.value.indexOf(value)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(value)
  }
  fetchRecipes()
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  fetchRecipes()
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
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

    if (selectedCategories.value.length > 0) {
      selectedCategories.value.forEach((cat) => {
        endpoint += `category[]=${encodeURIComponent(cat)}&`
      })
    }

    const response = await api.get(endpoint)
    recipes.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch recipes:', err)
    // UI Polish: Use i18n for the error message
    error.value = t('landing.error_loading')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  document.title = 'Entdecken | PrepYourMeal'
  Promise.all([fetchCategories(), fetchRecipes()])
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
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
