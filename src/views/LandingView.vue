<template>
  <!-- Wrapper has no padding at the top so the video hits the very top of the screen -->
  <div class="flex flex-col w-full min-h-screen">
    <!-- 1. Hero Section (Full Screen) -->
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <!-- Background Video mit Poster und Media Fragment (#t=90 für Start bei 1:30 Min) -->
      <video
        autoplay
        loop
        muted
        playsinline
        poster="@/assets/images/video-placeholder.png"
        class="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="@/assets/videos/Cinematic_slow_motion_tracking_wowm.mp4" type="video/mp4" />
      </video>

      <!-- Green Frosted Glass Overlay -->
      <div class="absolute inset-0 bg-dark-green/40 backdrop-blur-[2px] z-10"></div>

      <!-- Glass Box Content -->
      <div
        class="relative z-20 bg-white/90 backdrop-blur-md px-10 py-12 rounded-3xl shadow-2xl text-center max-w-lg mx-4 flex flex-col items-center"
      >
        <img
          src="@/assets/images/prepyourmeal_logo.svg"
          alt="PrepYourMeal Logo"
          class="h-28 md:h-32 w-auto mb-4 drop-shadow-sm"
        />

        <BrandName class="text-4xl md:text-5xl mb-6" />

        <p class="text-dark-green/70 text-lg leading-relaxed">
          {{ $t('landing.hero_subtitle') }}
        </p>
        <div class="w-full pt-6">
          <RouterLink
            to="/recipes"
            class="w-full flex justify-center items-center bg-primary-green text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-accent-gold transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl"
          >
            {{ $t('landing.cta_discover') }}
          </RouterLink>
        </div>
      </div>

      <a
        href="#vision"
        @click.prevent="scrollToVision"
        :aria-label="$t('landing.aria.scroll_to_vision')"
        class="absolute bottom-8 z-20 text-white animate-bounce cursor-pointer hover:text-primary-green transition-colors"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </a>
    </section>

    <!-- 2. Vision & Mission Section -->
    <section id="vision" class="w-full bg-white py-28 px-4 border-b border-gray-100">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Column: Tag & Striking Statement -->
        <div class="lg:col-span-5 flex flex-col items-start text-left">
          <span class="text-primary-green font-bold text-sm tracking-widest uppercase mb-4 block">
            {{ $t('landing.vision.tag') }}
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark-green leading-tight">
            {{ $t('landing.vision.title') }}
          </h2>
        </div>

        <!-- Right Column: Narrative Philosophy Text in an Editorial Box -->
        <div
          class="lg:col-span-7 bg-bg-cream/50 p-8 md:p-10 rounded-3xl border border-gray-100 relative shadow-sm"
        >
          <div
            class="absolute -top-4 -left-2 text-6xl text-primary-green/20 font-serif select-none"
          >
            “
          </div>
          <p class="text-gray-600 text-lg md:text-xl leading-relaxed relative z-10">
            {{ $t('landing.vision.text') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 3. Recipe Grid Section (Connected to your API) -->
    <section id="discover" class="w-full max-w-6xl mx-auto px-4 py-24 scroll-mt-20">
      <div class="flex items-center gap-4 mb-12">
        <h2 class="text-3xl font-bold text-dark-green m-0">
          {{ $t('landing.latest_recipes') }}
        </h2>
        <div
          class="h-1 flex-grow bg-gradient-to-r from-accent-gold/40 to-transparent rounded-full max-w-xs"
        ></div>
      </div>

      <!-- Loading State -->
      <LoadingState
        v-if="isLoading"
        :text="$t('landing.loading')"
        containerClass="py-12 bg-white rounded-2xl shadow-sm border border-gray-100"
      />

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center p-12 bg-red-50 rounded-2xl text-red-600 border border-red-200 shadow-sm"
      >
        <p>{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="displayedRecipes.length === 0"
        class="text-center p-12 bg-white rounded-2xl text-gray-500 shadow-sm border border-gray-100"
      >
        <p>{{ $t('landing.loading') }}</p>
      </div>

      <!-- API Recipe Grid with Fade Transition & Pause on Hover -->
      <div
        v-else
        class="relative min-h-[400px]"
        @mouseenter="pauseRotation"
        @mouseleave="startRotation"
      >
        <transition name="fade" mode="out-in">
          <div
            :key="currentIndex"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <RouterLink
              v-for="recipe in displayedRecipes"
              :key="recipe.slug"
              :to="`/recipe/${recipe.slug}`"
              class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-green/30 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
            >
              <!-- Image -->
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

              <!-- Content -->
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
                  <!-- Categories -->
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
                      {{ $t(`categories.${category}`, category) }}
                    </span>
                  </div>

                  <!-- Time Info -->
                  <div
                    v-if="recipe.prep_time || recipe.cook_time"
                    class="flex items-center text-sm text-gray-500 space-x-3 border-t border-gray-100 pt-4"
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
                    <span v-if="recipe.prep_time && recipe.cook_time" class="text-gray-300">|</span>
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
          </div>
        </transition>
      </div>
    </section>

    <!-- 4. Features / Info Section -->
    <section class="w-full bg-white py-24 border-t border-gray-100">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-primary-green font-bold text-sm tracking-widest uppercase mb-3 block">
            {{ $t('landing.features.tag') }}
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-dark-green leading-tight">
            {{ $t('landing.features.title') }}
          </h2>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <!-- Feature 1: Weekplaner -->
          <div class="flex flex-col items-center">
            <div
              class="w-16 h-16 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mb-6"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 class="font-bold text-xl text-dark-green mb-3">
              {{ $t('landing.features.planner_title') }}
            </h3>
            <p class="text-gray-500">
              {{ $t('landing.features.planner_desc') }}
            </p>
          </div>

          <!-- Feature 2: Shopping list -->
          <div class="flex flex-col items-center">
            <div
              class="w-16 h-16 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mb-6"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 class="font-bold text-xl text-dark-green mb-3">
              {{ $t('landing.features.shopping_title') }}
            </h3>
            <p class="text-gray-500">
              {{ $t('landing.features.shopping_desc') }}
            </p>
          </div>

          <!-- Feature 3: Cook healthy -->
          <div class="flex flex-col items-center">
            <div
              class="w-16 h-16 bg-secondary-rust/10 text-secondary-rust rounded-full flex items-center justify-center mb-6"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h3 class="font-bold text-xl text-dark-green mb-3">
              {{ $t('landing.features.healthy_title') }}
            </h3>
            <p class="text-gray-500">
              {{ $t('landing.features.healthy_desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Final Bottom CTA Banner -->
    <section class="w-full bg-dark-green py-24 px-4 relative overflow-hidden">
      <div
        class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-green/10 blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-accent-gold/10 blur-3xl pointer-events-none"
      ></div>

      <div class="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {{ $t('landing.bottom_cta.title') }}
        </h2>
        <p class="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {{ $t('landing.bottom_cta.subtitle') }}
        </p>
        <RouterLink
          to="/recipes"
          class="bg-primary-green text-white font-bold text-lg py-4 px-10 rounded-xl hover:bg-accent-gold transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
        >
          {{ $t('landing.bottom_cta.button') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'
import { getCategoryBadgeClass } from '../utils/theme'
import BrandName from '@/components/ui/BrandName.vue'
import LoadingState from '@/components/ui/LoadingState.vue'

interface Recipe {
  id?: number
  slug: string
  title: string
  description: string
  image?: string
  prep_time?: number
  cook_time?: number
  categories?: string[]
}

const allRecipes = ref<Recipe[]>([])
const displayedRecipes = ref<Recipe[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

const currentIndex = ref(0)
let rotationInterval: ReturnType<typeof setInterval> | null = null

const scrollToVision = () => {
  const element = document.getElementById('vision')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const updateDisplayedRecipes = () => {
  displayedRecipes.value = allRecipes.value.slice(currentIndex.value, currentIndex.value + 3)
}

const rotateRecipes = () => {
  if (allRecipes.value.length > 3) {
    currentIndex.value = (currentIndex.value + 3) % allRecipes.value.length
    updateDisplayedRecipes()
  }
}

const startRotation = () => {
  if (!rotationInterval) {
    rotationInterval = setInterval(rotateRecipes, 8000)
  }
}

const pauseRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
    rotationInterval = null
  }
}

onMounted(async () => {
  document.title = 'PrepYourMeal 🥗'
  try {
    isLoading.value = true
    const response = await api.get('/recipes?random=true&per_page=9')
    allRecipes.value = response.data.data || response.data

    updateDisplayedRecipes()
    startRotation()
  } catch (err) {
    console.error('Failed to fetch recipes:', err)
    error.value = 'Could not load recipes at this time.'
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  pauseRotation()
})
</script>
<style scoped>
/* Fade Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
