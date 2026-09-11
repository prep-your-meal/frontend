<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20">
    <!-- ==============================================
         AUTHENTICATED STATE (User is logged in)
         ============================================== -->
    <div v-if="authStore.isAuthenticated" class="w-full flex-grow flex flex-col relative">
      <!-- Desktop Spacer -->
      <div class="hidden md:block w-full h-8 shrink-0"></div>

      <!-- Header Section -->
      <div class="max-w-6xl w-full mx-auto px-4 pt-4 md:pt-8 pb-4 text-center md:text-left">
        <MobileHeader class="md:hidden mb-4" />
        <h1 class="text-3xl md:text-4xl font-extrabold text-dark-green mb-2 tracking-tight">
          {{ $t('planner.title', 'Wochenplaner') }}
        </h1>
        <p class="text-dark-green/60 text-base font-medium">
          {{ $t('planner.subtitle', 'Plane deine Mahlzeiten für die aktuelle Woche.') }}
        </p>
      </div>

      <!-- Sticky Week Navigation Bar -->
      <div
        class="sticky top-0 md:top-[80px] z-40 bg-white/90 backdrop-blur-xl border-y border-gray-200 shadow-sm transition-all w-full"
      >
        <div class="max-w-3xl mx-auto px-2">
          <ul class="flex justify-between items-center py-3 overflow-x-auto scrollbar-hide gap-2">
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
      <div class="max-w-3xl w-full mx-auto px-4 py-8 flex-grow flex flex-col gap-12">
        <section
          v-for="day in weekDays"
          :key="day.id"
          :id="day.id"
          class="scroll-mt-[140px] md:scroll-mt-[180px] day-section"
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
              Heute
            </span>
          </div>

          <!-- Meal Slots (Dummy Data for now) -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Breakfast Slot -->
            <div
              class="bg-white rounded-3xl p-4 md:p-5 border border-dashed border-gray-300 flex flex-col md:flex-row items-center gap-4 group hover:border-primary-green/50 hover:bg-primary-green/5 transition-all"
            >
              <div
                class="w-12 h-12 rounded-2xl bg-bg-cream flex items-center justify-center shrink-0 text-2xl group-hover:bg-white group-hover:shadow-sm transition-all"
              >
                🍳
              </div>
              <div class="flex-grow text-center md:text-left">
                <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  {{ $t('categories.breakfast', 'Frühstück') }}
                </h4>
                <p class="text-dark-green/50 font-medium">
                  {{ $t('planner.empty_slot', 'Noch nichts geplant') }}
                </p>
              </div>
              <button
                class="w-full md:w-auto mt-2 md:mt-0 px-5 py-2.5 bg-white border border-gray-200 text-dark-green font-bold rounded-xl hover:text-primary-green hover:border-primary-green transition-all shadow-sm"
              >
                + {{ $t('planner.add_recipe', 'Hinzufügen') }}
              </button>
            </div>

            <!-- Lunch Slot (Example of a filled slot) -->
            <div
              class="bg-white rounded-3xl p-4 md:p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all hover:border-primary-green/30"
            >
              <div
                class="w-full md:w-32 h-40 md:h-24 bg-gray-200 rounded-2xl shrink-0 overflow-hidden relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
                  alt="Food"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="flex-grow flex flex-col justify-center">
                <h4 class="text-xs font-bold text-primary-green uppercase tracking-wider mb-1">
                  {{ $t('categories.lunch', 'Mittagessen') }}
                </h4>
                <h3 class="text-lg font-bold text-dark-green line-clamp-1">
                  Quinoa Bowl mit Avocado
                </h3>
                <div class="flex items-center gap-3 mt-2 text-sm text-gray-500 font-medium">
                  <span class="flex items-center gap-1"
                    ><svg
                      class="w-4 h-4 text-primary-green"
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
                    25 Min</span
                  >
                  <span class="flex items-center gap-1"
                    ><svg
                      class="w-4 h-4 text-secondary-rust"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    2 Port.</span
                  >
                </div>
              </div>
              <button
                class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm"
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
            </div>

            <!-- Dinner Slot -->
            <div
              class="bg-white rounded-3xl p-4 md:p-5 border border-dashed border-gray-300 flex flex-col md:flex-row items-center gap-4 group hover:border-primary-green/50 hover:bg-primary-green/5 transition-all"
            >
              <div
                class="w-12 h-12 rounded-2xl bg-bg-cream flex items-center justify-center shrink-0 text-2xl group-hover:bg-white group-hover:shadow-sm transition-all"
              >
                🍲
              </div>
              <div class="flex-grow text-center md:text-left">
                <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  {{ $t('categories.dinner', 'Abendessen') }}
                </h4>
                <p class="text-dark-green/50 font-medium">
                  {{ $t('planner.empty_slot', 'Noch nichts geplant') }}
                </p>
              </div>
              <button
                class="w-full md:w-auto mt-2 md:mt-0 px-5 py-2.5 bg-white border border-gray-200 text-dark-green font-bold rounded-xl hover:text-primary-green hover:border-primary-green transition-all shadow-sm"
              >
                + {{ $t('planner.add_recipe', 'Hinzufügen') }}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- ==============================================
         GUEST TEASER STATE (Product-Led Growth)
         ============================================== -->
    <div
      v-else
      class="flex flex-col items-center md:justify-center w-full md:px-4 pt-4 pb-8 md:py-12 flex-grow"
    >
      <div
        class="w-full max-w-3xl pt-3 pb-10 md:py-10 relative md:bg-white md:px-12 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:border-t-[8px] md:border-t-primary-green"
      >
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none hidden md:block"
        ></div>
        <MobileHeader />

        <div
          class="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-4 px-4 md:px-0 relative z-10"
        >
          <div
            class="w-24 h-24 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mb-8"
          >
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>

          <h2 class="text-3xl font-extrabold text-dark-green mb-4">
            {{ $t('dashboard.teaser_title', 'Dein persönlicher Wochenplaner') }}
          </h2>
          <p class="text-gray-500 text-lg mb-10 leading-relaxed">
            {{
              $t(
                'dashboard.teaser_desc',
                'Speichere deine Lieblingsrezepte und plane deine Woche im Voraus. Melde dich kostenlos an, um diese Funktion zu nutzen.',
              )
            }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <RouterLink
              to="/register"
              class="flex-1 flex justify-center items-center text-center bg-primary-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-dark-green transition-colors shadow-sm"
            >
              {{ $t('dashboard.teaser_register', 'Kostenlos registrieren') }}
            </RouterLink>
            <RouterLink
              to="/login"
              class="flex-1 flex justify-center items-center text-center bg-white md:bg-gray-50 text-dark-green font-bold px-8 py-3.5 rounded-xl border border-gray-200 hover:border-primary-green hover:text-primary-green transition-colors shadow-sm"
            >
              {{ $t('dashboard.teaser_login', 'Anmelden') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import MobileHeader from '@/components/ui/MobileHeader.vue'

const authStore = useAuthStore()

interface WeekDay {
  id: string
  dateFormatted: string
  dateNum: number
  dayOfWeek: number
  isToday: boolean
}

// State
const activeDay = ref<string>('')
const weekDays = ref<WeekDay[]>([])
let observer: IntersectionObserver | null = null

// Generate current week dates (Monday to Sunday)
const generateCurrentWeek = () => {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  // Adjust to make Monday = 1, Sunday = 0 logic easier for offset
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek

  const monday = new Date(today)
  monday.setDate(today.getDate() + distanceToMonday)

  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)

    // Format YYYY-MM-DD for ID
    const id = d.toISOString().split('T')[0]

    // Create Date String for header (e.g. 11.09.)
    const dateFormatted = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`

    days.push({
      id,
      dateFormatted,
      dateNum: d.getDate(),
      dayOfWeek: d.getDay(),
      isToday: d.toDateString() === today.toDateString(),
    })
  }

  weekDays.value = days

  // Set initial active day to today (or monday if weekend)
  const todayObj = days.find((d) => d.isToday)
  activeDay.value = todayObj ? todayObj.id : days[0].id
}

// Scroll to specific day section
const scrollToDay = (id: string) => {
  activeDay.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Setup Intersection Observer for Scroll Spy
const setupScrollSpy = () => {
  const options = {
    root: null,
    rootMargin: '-150px 0px -60% 0px', // Adjusts when the section is considered "active"
    threshold: 0,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeDay.value = entry.target.id
      }
    })
  }, options)

  // Observe all day sections
  setTimeout(() => {
    document.querySelectorAll('.day-section').forEach((section) => {
      if (observer) observer.observe(section)
    })
  }, 100) // Slight delay to ensure DOM is rendered
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    generateCurrentWeek()
    setupScrollSpy()

    // Scroll to "Today" immediately if we load the view
    setTimeout(() => {
      const today = weekDays.value.find((d) => d.isToday)
      if (today) {
        scrollToDay(today.id)
      }
    }, 200)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
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
</style>
