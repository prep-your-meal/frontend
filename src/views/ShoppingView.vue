<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20">
    <!-- ==============================================
         AUTHENTICATED STATE (User is logged in)
         ============================================== -->
    <div
      v-if="authStore.isAuthenticated"
      class="max-w-4xl w-full mx-auto pb-8 flex-grow flex flex-col md:px-4"
    >
      <!-- Desktop Spacer -->
      <div class="w-full h-4 md:h-28 shrink-0"></div>

      <!-- PAGE TITLE & MOBILE HEADER -->
      <div
        class="px-4 sm:px-10 pt-3 md:pt-10 pb-4 z-10 transition-opacity duration-300 relative flex flex-col items-center text-center md:bg-white md:border-t md:border-x md:border-gray-100 md:rounded-t-3xl"
      >
        <MobileHeader />

        <h1
          class="text-4xl md:text-5xl font-extrabold text-dark-green mb-3 tracking-tight mt-2 md:mt-0"
        >
          {{ $t('shopping.title') }}
        </h1>
        <p class="text-dark-green/60 text-lg max-w-xl font-medium">
          {{ $t('shopping.protected_text') }}
        </p>
      </div>

      <!-- WEEK SELECTOR -->
      <div
        class="sticky top-0 md:top-[95px] z-40 mb-8 bg-white/95 backdrop-blur-xl px-4 py-4 shadow-sm border-b border-gray-200 md:border-x md:border-gray-100 md:border-t-0 md:rounded-b-3xl"
      >
        <div class="flex items-center justify-between max-w-sm mx-auto">
          <!-- Left Navigation (Clean, no badges) -->
          <button
            @click="changeWeek(-1)"
            class="p-2 text-gray-400 hover:text-primary-green transition-colors"
            :title="$t('shopping.prev_week')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <div class="text-center">
            <span class="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              {{ $t('shopping.week') }}
            </span>
            <span class="text-lg font-extrabold text-dark-green">{{ weekLabel }}</span>
          </div>

          <!-- Right Navigation (Clean, no badges) -->
          <button
            @click="changeWeek(1)"
            class="p-2 text-gray-400 hover:text-primary-green transition-colors"
            :title="$t('shopping.next_week')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- LIST CONTENT -->
      <div class="px-4 flex-grow flex flex-col gap-8">
        <div v-if="isLoading" class="py-12 flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
        </div>

        <template v-else>
          <!-- Custom Items Module -->
          <section class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              class="bg-secondary-rust/5 px-6 py-4 border-b border-secondary-rust/10 flex justify-between items-center"
            >
              <h3 class="font-bold text-dark-green">
                {{ $t('shopping.custom_items') }}
              </h3>
              <button
                v-if="hasCompletedCustomItems"
                @click="clearCompletedCustomItems"
                class="text-xs font-bold text-secondary-rust hover:text-orange-700 transition-colors"
              >
                {{ $t('shopping.clear_completed') }}
              </button>
            </div>

            <div class="p-4 border-b border-gray-100">
              <form @submit.prevent="addCustomItem" class="relative">
                <input
                  v-model="newItemName"
                  type="text"
                  :placeholder="$t('shopping.add_custom')"
                  class="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 pr-12 focus:ring-2 focus:ring-secondary-rust focus:bg-white transition-all outline-none"
                  :disabled="isAddingCustomItem"
                />
                <button
                  type="submit"
                  :disabled="!newItemName.trim() || isAddingCustomItem"
                  class="absolute right-2 top-2 bottom-2 aspect-square bg-secondary-rust text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>

            <ul v-if="customItems.length > 0" class="divide-y divide-gray-100">
              <li
                v-for="item in customItems"
                :key="item.id"
                class="px-6 py-4 flex items-center gap-4 hover:bg-bg-cream/20 transition-colors cursor-pointer group"
                @click="toggleCustomItem(item)"
              >
                <div
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                  :class="
                    item.is_checked ? 'bg-secondary-rust border-secondary-rust' : 'border-gray-300'
                  "
                >
                  <svg
                    v-if="item.is_checked"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div
                  class="flex-grow transition-all"
                  :class="item.is_checked ? 'opacity-40 line-through' : ''"
                >
                  <span class="font-medium text-dark-green">{{ item.name }}</span>
                </div>
                <button
                  @click.stop="deleteCustomItem(item.id)"
                  class="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </section>

          <!-- Empty Recipe State -->
          <div
            v-if="Object.keys(recipeIngredients).length === 0"
            class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center mb-12"
          >
            <div class="text-4xl mb-4">🍋</div>
            <p class="text-gray-500 font-medium">
              {{ $t('shopping.empty_list') }}
            </p>
          </div>

          <!-- Recipe Ingredients (Categorized) -->
          <template v-else>
            <section
              v-for="(ingredients, categoryKey) in recipeIngredients"
              :key="categoryKey"
              class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div class="bg-primary-green/5 px-6 py-4 border-b border-primary-green/10">
                <h3 class="font-bold text-dark-green">{{ translateCategory(categoryKey) }}</h3>
              </div>
              <ul class="divide-y divide-gray-100">
                <li
                  v-for="item in ingredients"
                  :key="item.slug"
                  class="px-6 py-4 flex items-center gap-4 hover:bg-bg-cream/20 transition-colors cursor-pointer"
                  @click="toggleRecipeIngredient(item.slug)"
                >
                  <div
                    class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                    :class="
                      localCheckedIngredients.has(item.slug)
                        ? 'bg-primary-green border-primary-green'
                        : 'border-gray-300'
                    "
                  >
                    <svg
                      v-if="localCheckedIngredients.has(item.slug)"
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div
                    class="flex-grow transition-all"
                    :class="localCheckedIngredients.has(item.slug) ? 'opacity-40 line-through' : ''"
                  >
                    <span class="font-medium text-dark-green">{{
                      getLocalizedName(item.name)
                    }}</span>
                  </div>
                  <div
                    class="text-sm font-bold text-primary-green bg-primary-green/10 px-3 py-1 rounded-full whitespace-nowrap transition-all"
                    :class="localCheckedIngredients.has(item.slug) ? 'opacity-40' : ''"
                  >
                    {{ item.total_amount }} {{ item.unit }}
                  </div>
                </li>
              </ul>
            </section>
          </template>
        </template>
      </div>

      <!-- Reusable Premium Modal -->
      <PremiumModal :show="showPremiumModal" @close="showPremiumModal = false" />
    </div>

    <!-- ==============================================
         GUEST TEASER STATE
         ============================================== -->
    <div
      v-else
      class="flex flex-col items-center md:justify-center w-full md:px-4 pt-4 pb-8 md:py-12 flex-grow"
    >
      <div
        class="w-full max-w-3xl pt-3 pb-10 md:py-10 relative md:bg-white md:px-12 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:border-t-[8px] md:border-t-primary-green"
      >
        <MobileHeader />
        <div
          class="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-4 px-4 md:px-0 relative z-10"
        >
          <div
            class="w-24 h-24 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mb-8"
          >
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-dark-green mb-4">
            {{ $t('shopping.teaser_title') }}
          </h2>
          <p class="text-gray-500 text-lg mb-10 leading-relaxed">
            {{ $t('shopping.teaser_desc') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <RouterLink
              to="/register"
              class="flex-1 flex justify-center items-center text-center bg-primary-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-dark-green transition-colors shadow-sm"
              >{{ $t('shopping.teaser_register') }}</RouterLink
            >
            <RouterLink
              to="/login"
              class="flex-1 flex justify-center items-center text-center bg-white md:bg-gray-50 text-dark-green font-bold px-8 py-3.5 rounded-xl border border-gray-200 hover:border-primary-green hover:text-primary-green transition-colors shadow-sm"
              >{{ $t('shopping.teaser_login') }}</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import MobileHeader from '@/components/ui/MobileHeader.vue'
import PremiumModal from '@/components/ui/PremiumModal.vue'
import api from '@/services/api'

const authStore = useAuthStore()
const { locale, t } = useI18n()

// Interfaces matching backend payload structure
interface RecipeIngredient {
  slug: string
  name: Record<string, string> | string
  unit: string
  category: string
  total_amount: number
}

interface CustomItem {
  id: number
  name: string
  is_checked: boolean
}

// State
const isLoading = ref(true)
const isAddingCustomItem = ref(false)
const recipeIngredients = ref<Record<string, RecipeIngredient[]>>({})
const customItems = ref<CustomItem[]>([])
const localCheckedIngredients = ref<Set<string>>(new Set())

// Week Navigation & Premium Modal
const currentRefDate = ref(new Date())
const newItemName = ref('')
const showPremiumModal = ref(false)

// ------------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------------
// Handle API 403 Premium Errors globally for this view with strict typing
const handleApiError = (error: unknown) => {
  const err = error as {
    response?: {
      status?: number
      data?: { requires_premium?: boolean }
    }
  }

  if (err.response?.status === 403 && err.response?.data?.requires_premium) {
    showPremiumModal.value = true
  } else {
    console.error('API Error:', error)
  }
}

// Check if a given date falls within the real-world current week (Monday-Sunday)
const isDateInCurrentWeek = (date: Date) => {
  const now = new Date()
  const day = now.getDay()
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1)

  const startOfCurrentWeek = new Date(now.setDate(diffToMonday))
  startOfCurrentWeek.setHours(0, 0, 0, 0)

  const endOfCurrentWeek = new Date(startOfCurrentWeek)
  endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6)
  endOfCurrentWeek.setHours(23, 59, 59, 999)

  return date >= startOfCurrentWeek && date <= endOfCurrentWeek
}

// ------------------------------------------------------------------------
// COMPUTED LOGIC
// ------------------------------------------------------------------------
const weekRange = computed(() => {
  const date = new Date(currentRefDate.value)
  const day = date.getDay()
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1)

  const start = new Date(date.setDate(diffToMonday))
  const end = new Date(new Date(start).setDate(start.getDate() + 6))

  return { start, end }
})

const weekLabel = computed(() => {
  const { start, end } = weekRange.value
  const formatOpts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' }
  return `${start.toLocaleDateString('de-DE', formatOpts)} - ${end.toLocaleDateString('de-DE', formatOpts)}`
})

const changeWeek = (offset: number) => {
  const newDate = new Date(currentRefDate.value)
  newDate.setDate(newDate.getDate() + offset * 7)

  // Proactive Premium Check: Prevent navigating outside current week if not premium
  if (!authStore.user?.is_premium && !isDateInCurrentWeek(newDate)) {
    showPremiumModal.value = true
    return
  }

  currentRefDate.value = newDate
}

const translateCategory = (categoryKey: string) => {
  const normalizedKey = categoryKey
    .toLowerCase()
    .replace(/\s*&\s*/g, '_and_')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  const translationKey = `shopping.category_names.${normalizedKey}`
  const translated = t(translationKey)
  return translated !== translationKey ? translated : categoryKey
}

const getLocalizedName = (nameField: Record<string, string> | string) => {
  if (typeof nameField === 'string') return nameField
  const currentLang = locale.value as string
  return nameField[currentLang] || nameField['en'] || Object.values(nameField)[0] || ''
}

// ------------------------------------------------------------------------
// DATA FETCHING & ACTIONS
// ------------------------------------------------------------------------
const fetchShoppingList = async () => {
  if (!authStore.isAuthenticated) return

  isLoading.value = true
  try {
    const startStr = new Date(
      weekRange.value.start.getTime() - weekRange.value.start.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0]
    const endStr = new Date(
      weekRange.value.end.getTime() - weekRange.value.end.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0]

    const res = await api.get('/shopping-list', {
      params: {
        start_date: startStr,
        end_date: endStr,
        _t: Date.now(),
      },
    })

    recipeIngredients.value = res.data.data.recipes || {}
    customItems.value = res.data.data.custom_items || []
    localCheckedIngredients.value.clear()
  } catch (error) {
    handleApiError(error)
  } finally {
    isLoading.value = false
  }
}

const toggleRecipeIngredient = (slug: string) => {
  if (localCheckedIngredients.value.has(slug)) {
    localCheckedIngredients.value.delete(slug)
  } else {
    localCheckedIngredients.value.add(slug)
  }
}

const hasCompletedCustomItems = computed(() => {
  return customItems.value.some((item) => item.is_checked)
})

const addCustomItem = async () => {
  const name = newItemName.value.trim()
  if (!name) return

  isAddingCustomItem.value = true
  try {
    const startStr = new Date(
      weekRange.value.start.getTime() - weekRange.value.start.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0]
    const res = await api.post('/shopping-list/custom', { name, week_start: startStr })
    customItems.value.unshift(res.data.data)
    newItemName.value = ''
  } catch (error) {
    handleApiError(error)
  } finally {
    isAddingCustomItem.value = false
  }
}

const toggleCustomItem = async (item: CustomItem) => {
  item.is_checked = !item.is_checked
  try {
    await api.put(`/shopping-list/custom/${item.id}/toggle`)
  } catch (error) {
    item.is_checked = !item.is_checked // Revert visually on fail
    handleApiError(error)
  }
}

const deleteCustomItem = async (id: number) => {
  try {
    await api.delete(`/shopping-list/custom/${id}`)
    customItems.value = customItems.value.filter((item) => item.id !== id)
  } catch (error) {
    handleApiError(error)
  }
}

const clearCompletedCustomItems = async () => {
  try {
    const startStr = new Date(
      weekRange.value.start.getTime() - weekRange.value.start.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0]
    await api.delete('/shopping-list/custom/completed', {
      params: { week_start: startStr },
    })
    customItems.value = customItems.value.filter((item) => !item.is_checked)
  } catch (error) {
    handleApiError(error)
  }
}

// ------------------------------------------------------------------------
// WATCHERS & LIFECYCLE
// ------------------------------------------------------------------------
watch(currentRefDate, fetchShoppingList)

onMounted(() => {
  fetchShoppingList()
})

onActivated(() => {
  if (authStore.isAuthenticated) {
    fetchShoppingList()
  }
})
</script>
