import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Recipe {
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

export interface FilterItem {
  labelKey: string
  value: string
  icon: string
}

export interface FilterGroup {
  titleKey: string
  items: FilterItem[]
}

export const useRecipeStore = defineStore(
  'recipes',
  () => {
    const recipes = ref<Recipe[]>([])
    const categoryGroups = ref<FilterGroup[]>([])

    const searchQuery = ref('')
    const selectedCategories = ref<string[]>([])

    const hasLoaded = ref(false)

    const detailedRecipes = ref<Record<string, Recipe>>({})

    const savedScrollPosition = ref<number>(0)

    return {
      recipes,
      categoryGroups,
      searchQuery,
      selectedCategories,
      hasLoaded,
      detailedRecipes,
      savedScrollPosition,
    }
  },
  {
    persist: {
      pick: ['recipes', 'categoryGroups', 'detailedRecipes'],
    },
  },
)
