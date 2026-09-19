<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20">
    <!-- ==============================================
         AUTHENTICATED STATE (User is logged in)
         ============================================== -->
    <div
      v-if="authStore.isAuthenticated"
      class="max-w-6xl w-full mx-auto pb-8 flex-grow flex flex-col md:px-4"
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
          {{ $t('planner.title') }}
        </h1>
        <p class="text-dark-green/60 text-lg max-w-xl font-medium">
          {{ $t('planner.subtitle') }}
        </p>
      </div>

      <!-- STICKY WEEK NAVIGATION BAR -->
      <div
        class="sticky top-0 md:top-[95px] z-40 mb-10 bg-white/95 backdrop-blur-xl px-4 sm:px-6 py-3 transition-all duration-500 md:rounded-b-3xl md:rounded-t-none"
        :class="[
          isScrolled
            ? 'shadow-md md:shadow-xl shadow-dark-green/5 md:border md:border-gray-100'
            : 'shadow-sm border-b border-gray-200 md:border-x md:border-gray-100 md:border-t-0',
        ]"
      >
        <div class="max-w-3xl w-full mx-auto flex flex-col gap-3">
          <!-- Week Switcher (Clean, no badges) -->
          <div class="flex items-center justify-between w-full">
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
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {{ $t('shopping.week') }}
              </span>
              <span class="text-sm font-extrabold text-dark-green">{{ weekLabel }}</span>
            </div>

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

          <!-- Days Row -->
          <ul class="flex justify-between items-center overflow-x-auto scrollbar-hide gap-2 w-full">
            <li v-for="day in weekDays" :key="day.id" class="flex-1 shrink-0 min-w-[3rem]">
              <button
                @click="scrollToDay(day.id)"
                class="w-full flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-300 relative group"
                :class="
                  activeDay === day.id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'text-gray-400 hover:bg-bg-cream/50 hover:text-dark-green'
                "
              >
                <!-- Today Indicator Dot -->
                <span
                  v-if="day.isToday && activeDay !== day.id"
                  class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-secondary-rust rounded-full"
                ></span>
                <span
                  class="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                  :class="activeDay === day.id ? 'text-white/90' : ''"
                >
                  {{ $t(`planner.days.short.${day.dayOfWeek}`) }}
                </span>
                <span
                  class="text-lg font-extrabold"
                  :class="activeDay === day.id ? 'text-white' : 'text-dark-green'"
                >
                  {{ day.dateNum }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Vertical Feed (The Planner Content) -->
      <div
        class="max-w-3xl w-full mx-auto px-4 flex-grow flex flex-col gap-12 self-center relative"
      >
        <!-- Loading State for full plan -->
        <div v-if="isLoadingPlan" class="py-12 flex justify-center">
          <LoadingState :text="$t('landing.loading')" />
        </div>

        <!-- Global Generate Button (Shown if plan is empty and not loading) -->
        <div
          v-else-if="!hasActivePlan && !isGenerating"
          class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center"
        >
          <div class="text-5xl mb-4">✨</div>
          <h3 class="text-2xl font-bold text-dark-green mb-2">
            {{ $t('planner.empty_plan_title') }}
          </h3>
          <p class="text-gray-500 mb-6 max-w-sm">
            {{ $t('planner.empty_plan_desc') }}
          </p>
          <button
            @click="generatePlan"
            class="px-8 py-3.5 bg-primary-green text-white font-bold rounded-xl hover:bg-dark-green transition-colors shadow-sm flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            {{ $t('planner.generate_plan') }}
          </button>
        </div>

        <!-- Generating State -->
        <div
          v-else-if="isGenerating"
          class="py-20 flex flex-col items-center justify-center text-center"
        >
          <LoadingState :text="$t('planner.generating')" />
        </div>

        <!-- The actual days list -->
        <template v-else>
          <section
            v-for="day in weekDays"
            :key="day.id"
            :id="day.id"
            class="scroll-mt-[160px] md:scroll-mt-[200px] day-section"
          >
            <!-- Day Divider / Header -->
            <div class="flex items-center gap-4 mb-6">
              <h2 class="text-2xl font-bold text-dark-green flex items-baseline gap-2">
                {{ $t(`planner.days.long.${day.dayOfWeek}`) }}
                <span class="text-gray-400 text-lg font-medium">{{ day.dateFormatted }}</span>
              </h2>
              <div class="h-px flex-grow bg-gray-200 rounded-full"></div>
              <span
                v-if="day.isToday"
                class="px-3 py-1 bg-secondary-rust/10 text-secondary-rust text-xs font-bold rounded-full uppercase tracking-wider"
              >
                {{ $t('planner.today') }}
              </span>
            </div>

            <!-- Single Meal Slot -->
            <div class="grid grid-cols-1 gap-4">
              <!-- If a meal is planned for this day -->
              <div
                v-if="mealPlanData[day.id]"
                class="bg-white rounded-3xl p-4 md:p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 relative overflow-hidden group transition-all hover:border-primary-green/30"
              >
                <div
                  class="w-full md:w-32 h-48 md:h-28 bg-gray-200 rounded-2xl shrink-0 overflow-hidden relative cursor-pointer"
                  @click="$router.push(`/recipe/${mealPlanData[day.id].recipe.slug}`)"
                >
                  <img
                    v-if="
                      mealPlanData[day.id].recipe.image || mealPlanData[day.id].recipe.image_url
                    "
                    :src="
                      mealPlanData[day.id].recipe.image || mealPlanData[day.id].recipe.image_url
                    "
                    :alt="mealPlanData[day.id].recipe.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-3xl opacity-50"
                  >
                    🍽️
                  </div>
                </div>

                <div
                  class="flex-grow flex flex-col justify-center cursor-pointer"
                  @click="$router.push(`/recipe/${mealPlanData[day.id].recipe.slug}`)"
                >
                  <h4 class="text-xs font-bold text-primary-green uppercase tracking-wider mb-1">
                    {{ mealPlanData[day.id].portions }} {{ $t('planner.portions') }}
                  </h4>
                  <h3
                    class="text-lg font-bold text-dark-green line-clamp-1 group-hover:text-primary-green transition-colors"
                  >
                    {{ mealPlanData[day.id].recipe.title }}
                  </h3>

                  <div
                    v-if="
                      mealPlanData[day.id].recipe.prep_time || mealPlanData[day.id].recipe.cook_time
                    "
                    class="flex items-center text-sm text-dark-green/50 space-x-3 mt-3"
                  >
                    <div v-if="mealPlanData[day.id].recipe.prep_time" class="flex items-center">
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
                      <span>{{
                        $t('landing.prep_time', { prep: mealPlanData[day.id].recipe.prep_time })
                      }}</span>
                    </div>
                    <span
                      v-if="
                        mealPlanData[day.id].recipe.prep_time &&
                        mealPlanData[day.id].recipe.cook_time
                      "
                      class="text-gray-200"
                      >|</span
                    >
                    <div v-if="mealPlanData[day.id].recipe.cook_time" class="flex items-center">
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
                      <span>{{
                        $t('landing.cook_time', { cook: mealPlanData[day.id].recipe.cook_time })
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons (Swap & Delete) -->
                <div class="absolute top-4 right-4 flex gap-2">
                  <button
                    v-if="!day.isPast"
                    @click.stop="openAddModal(day.id)"
                    :disabled="isProcessingAction === day.id"
                    class="text-gray-400 hover:text-primary-green transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm border border-gray-100 disabled:opacity-50"
                    :title="$t('planner.swap_meal')"
                  >
                    <svg
                      v-if="isProcessingAction !== day.id"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4 animate-spin text-primary-green"
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
                  </button>
                  <button
                    @click.stop="removeMeal(day.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm border border-gray-100"
                    :title="$t('planner.remove_meal')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- If NO meal is planned for this day -->
              <div
                v-else
                class="bg-white rounded-3xl p-4 md:p-5 border border-dashed border-gray-300 flex flex-col md:flex-row items-center gap-4 group transition-all"
                :class="
                  !day.isPast
                    ? 'hover:border-primary-green/50 hover:bg-primary-green/5'
                    : 'opacity-70'
                "
              >
                <div
                  class="w-12 h-12 rounded-2xl bg-bg-cream flex items-center justify-center shrink-0 text-2xl transition-all"
                  :class="!day.isPast ? 'group-hover:bg-white group-hover:shadow-sm' : ''"
                >
                  🍽️
                </div>
                <div class="flex-grow text-center md:text-left">
                  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    {{ $t('planner.meal') }}
                  </h4>
                  <p class="text-dark-green/50 font-medium">
                    {{ day.isPast ? $t('planner.no_meal_planned') : $t('planner.empty_slot') }}
                  </p>
                </div>
                <button
                  v-if="!day.isPast"
                  @click="openAddModal(day.id)"
                  class="w-full md:w-auto mt-2 md:mt-0 px-5 py-2.5 bg-white border border-gray-200 text-dark-green text-center font-bold rounded-xl hover:text-primary-green hover:border-primary-green transition-all shadow-sm block"
                >
                  + {{ $t('planner.add_recipe') }}
                </button>
              </div>
            </div>
          </section>
        </template>
      </div>

      <!-- MODALS -->
      <RecipeSelectionModal
        :show="isAddModalOpen"
        :title="$t('planner.add_meal')"
        :subtitle="addModalDateFormatted"
        :recipes="alternativeRecipes"
        :is-loading="isLoadingAlternatives"
        :loading-text="$t('planner.searching_alternatives')"
        :notice-text="$t('planner.food_waste_notice')"
        @close="closeAddModal"
        @select="selectRecipeForDate"
      />

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
          <h2 class="text-3xl font-extrabold text-dark-green mb-4">
            {{ $t('dashboard.teaser_title') }}
          </h2>
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <RouterLink
              to="/register"
              class="flex-1 flex justify-center items-center text-center bg-primary-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-dark-green transition-colors shadow-sm"
              >{{ $t('dashboard.teaser_register') }}</RouterLink
            >
            <RouterLink
              to="/login"
              class="flex-1 flex justify-center items-center text-center bg-white md:bg-gray-50 text-dark-green font-bold px-8 py-3.5 rounded-xl border border-gray-200 hover:border-primary-green hover:text-primary-green transition-colors shadow-sm"
              >{{ $t('dashboard.teaser_login') }}</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onActivated, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import MobileHeader from '@/components/ui/MobileHeader.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import RecipeSelectionModal from '@/components/ui/RecipeSelectionModal.vue'
import PremiumModal from '@/components/ui/PremiumModal.vue'
import api from '@/services/api'

const authStore = useAuthStore()
const { t, locale } = useI18n()

// ------------------------------------------------------------------------
// DOCUMENT TITLE
// ------------------------------------------------------------------------
const originalTitle = document.title
const updateTitle = () => {
  document.title = `${t('planner.title')} | PrepYourMeal`
}
watch(locale, updateTitle)

// ------------------------------------------------------------------------
// INTERFACES & STATE
// ------------------------------------------------------------------------
interface WeekDay {
  id: string
  dateFormatted: string
  dateNum: number
  dayOfWeek: number
  isToday: boolean
  isPast: boolean
}

interface Recipe {
  id?: number
  slug: string
  title: string
  description?: string
  image?: string | null
  image_url?: string | null
  prep_time?: string | null
  cook_time?: string | null
  categories?: string[]
}

interface MealPlanItem {
  id?: number
  user_id?: number
  recipe_slug?: string
  scheduled_for?: string
  date?: string
  portions: number
  recipe: Recipe
}

const activeDay = ref<string>('')
const weekDays = ref<WeekDay[]>([])
const isScrolled = ref(false)
let observer: IntersectionObserver | null = null

// State for Week Navigation & Premium Modal
const currentRefDate = ref(new Date())
const showPremiumModal = ref(false)

// API States
const mealPlanData = ref<Record<string, MealPlanItem>>({})
const isLoadingPlan = ref(true)
const isGenerating = ref(false)
const isProcessingAction = ref<string | null>(null)

// Modal States
const isAddModalOpen = ref(false)
const addModalDate = ref('')
const alternativeRecipes = ref<Recipe[]>([])
const isLoadingAlternatives = ref(false)

const hasActivePlan = computed(() => Object.keys(mealPlanData.value).length > 0)

const addModalDateFormatted = computed(() => {
  if (!addModalDate.value) return ''
  const dayObj = weekDays.value.find((d) => d.id === addModalDate.value)
  if (dayObj) return `${t(`planner.days.long.${dayObj.dayOfWeek}`)}, ${dayObj.dateFormatted}`
  return addModalDate.value
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 180
}

// ------------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------------
// Handle API 403 Premium Errors globally for this view
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
// DATE LOGIC & WEEK NAVIGATION
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

const generateWeekDays = () => {
  const today = new Date()
  const offsetToday = today.getTimezoneOffset() * 60000
  const localISOToday = new Date(today.getTime() - offsetToday).toISOString().slice(0, 10)

  // Start from the calculated Monday of the current week range
  const monday = new Date(weekRange.value.start)
  const days = []

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)

    const offsetD = d.getTimezoneOffset() * 60000
    const id = new Date(d.getTime() - offsetD).toISOString().slice(0, 10)
    const dateFormatted = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`

    const isToday = id === localISOToday
    const isPast = id < localISOToday

    days.push({ id, dateFormatted, dateNum: d.getDate(), dayOfWeek: d.getDay(), isToday, isPast })
  }

  weekDays.value = days

  // Select today if it's in the viewed week, otherwise default to Monday
  const todayObj = days.find((d) => d.isToday)
  activeDay.value = todayObj ? todayObj.id : days[0].id
}

const scrollToDay = (id: string, isSmooth = true) => {
  activeDay.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'auto', block: 'start' })
  }
}

const setupScrollSpy = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeDay.value = entry.target.id
      })
    },
    { root: null, rootMargin: '-150px 0px -60% 0px', threshold: 0 },
  )

  setTimeout(() => {
    document.querySelectorAll('.day-section').forEach((section) => {
      if (observer) observer.observe(section)
    })
  }, 100)
}

// ------------------------------------------------------------------------
// API LOGIC
// ------------------------------------------------------------------------
const processPlanResponse = (dataArray: MealPlanItem[]) => {
  const map: Record<string, MealPlanItem> = {}
  dataArray.forEach((item) => {
    const rawDate = item.scheduled_for || item.date || ''
    if (rawDate) {
      const dateKey = rawDate.split(' ')[0].split('T')[0]
      map[dateKey] = item
    }
  })
  mealPlanData.value = { ...map }
}

const fetchPlan = async () => {
  if (!authStore.isAuthenticated) return

  try {
    isLoadingPlan.value = true
    const startDate = weekDays.value[0].id
    const endDate = weekDays.value[6].id

    const res = await api.get('/plan', {
      params: { start_date: startDate, end_date: endDate },
    })

    processPlanResponse(res.data.data || [])
  } catch (error) {
    handleApiError(error)
  } finally {
    isLoadingPlan.value = false
  }
}

const generatePlan = async () => {
  try {
    isGenerating.value = true
    const todayObj = weekDays.value.find((d) => d.isToday)
    const startDate = todayObj ? todayObj.id : weekDays.value[0].id

    const res = await api.post('/plan/generate', { start_date: startDate })
    processPlanResponse(res.data.data || [])

    if (todayObj) {
      currentRefDate.value = new Date()
    }
  } catch (error) {
    handleApiError(error)
  } finally {
    isGenerating.value = false
  }
}

const removeMeal = async (dateKey: string) => {
  try {
    await api.delete(`/plan/${dateKey}`)
    const updatedPlan = { ...mealPlanData.value }
    delete updatedPlan[dateKey]
    mealPlanData.value = updatedPlan
  } catch (error) {
    handleApiError(error)
  }
}

// ------------------------------------------------------------------------
// MODAL LOGIC
// ------------------------------------------------------------------------
const openAddModal = async (date: string) => {
  addModalDate.value = date
  isAddModalOpen.value = true
  isLoadingAlternatives.value = true

  try {
    const res = await api.get(`/plan/${date}/alternatives`)
    alternativeRecipes.value = res.data.data
  } catch (error) {
    handleApiError(error)
    closeAddModal() // Close modal if API rejected the request due to premium constraints
  } finally {
    isLoadingAlternatives.value = false
  }
}

const closeAddModal = () => {
  isAddModalOpen.value = false
  setTimeout(() => {
    alternativeRecipes.value = []
  }, 300)
}

const selectRecipeForDate = async (slug: string) => {
  try {
    const date = addModalDate.value
    closeAddModal()
    isProcessingAction.value = date

    const res = await api.post(`/plan/${date}/add`, { recipe_slug: slug })
    mealPlanData.value = { ...mealPlanData.value, [date]: res.data.data }
  } catch (error) {
    handleApiError(error)
  } finally {
    isProcessingAction.value = null
  }
}

// ------------------------------------------------------------------------
// WATCHERS & LIFECYCLE
// ------------------------------------------------------------------------
watch(currentRefDate, () => {
  generateWeekDays()
  fetchPlan()
})

onMounted(() => {
  updateTitle()
  if (authStore.isAuthenticated) {
    generateWeekDays()
    setupScrollSpy()
    fetchPlan()

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    nextTick(() => {
      setTimeout(() => {
        const targetDay = weekDays.value.find((d) => d.isToday)
        if (targetDay && targetDay.id !== weekDays.value[0].id) {
          scrollToDay(targetDay.id, true)
        }
      }, 350)
    })
  }
})

onActivated(() => {
  if (authStore.isAuthenticated) {
    fetchPlan()
  }
})

onUnmounted(() => {
  document.title = originalTitle
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
