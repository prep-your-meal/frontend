import { ref } from 'vue'
import api from '@/services/api'
import type { FilterGroup } from '@/stores/recipes'

// Exporting these so they can be extended or used individually if needed
export const iconMapping: Record<string, string> = {
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

export const groupKeyMapping: Record<string, string> = {
  meal_types: 'recipes.filters.groups.meal_types',
  diets: 'recipes.filters.groups.diets',
  fitness_profiles: 'recipes.filters.groups.fitness',
  logistics: 'recipes.filters.groups.logistics',
  allergies: 'recipes.filters.groups.allergies',
}

export function useCategories() {
  const categoryGroups = ref<FilterGroup[]>([])
  const isLoading = ref(false)

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/meta/categories')
      const data = response.data.data || response.data

      const groups: FilterGroup[] = []

      for (const [groupKey, itemsArray] of Object.entries(data)) {
        groups.push({
          titleKey: groupKeyMapping[groupKey] || `recipes.filters.groups.${groupKey}`,
          // Store the raw key (e.g. 'diets') to filter groups easily in the views
          rawKey: groupKey,
          items: (itemsArray as string[]).map((val) => ({
            labelKey: `categories.${val}`,
            value: val,
            icon: iconMapping[val] || '🏷️',
          })),
        })
      }
      categoryGroups.value = groups
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    categoryGroups,
    isLoading,
    fetchCategories,
  }
}
