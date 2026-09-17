<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-dark-green/60 backdrop-blur-sm p-4 md:p-8"
    >
      <div
        class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] my-auto"
      >
        <!-- Header -->
        <div
          class="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0"
        >
          <div>
            <h3 class="text-xl font-bold text-dark-green">
              {{ title }}
            </h3>
            <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-secondary-rust hover:bg-red-50 rounded-full transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 md:p-6 overflow-y-auto flex-grow bg-white relative">
          <div v-if="isLoading" class="py-12 flex justify-center">
            <LoadingState :text="loadingText || 'Loading...'" />
          </div>

          <div v-else class="flex flex-col gap-4">
            <!-- Optional Info Notice (e.g., for Food Waste Tips) -->
            <div
              v-if="noticeText"
              class="bg-primary-green/10 text-primary-green px-4 py-3 rounded-xl text-sm font-medium mb-2 flex items-start gap-3"
            >
              <span class="text-lg">💡</span>
              <p>{{ noticeText }}</p>
            </div>

            <!-- Empty State Fallback -->
            <div v-if="recipes.length === 0" class="text-center py-10 text-gray-500">
              <p>No recipes found.</p>
            </div>

            <!-- Recipe List -->
            <button
              v-for="recipe in recipes"
              :key="recipe.slug"
              @click="$emit('select', recipe.slug)"
              class="flex items-center gap-4 p-3 rounded-2xl hover:bg-bg-cream/50 border border-transparent hover:border-primary-green/30 transition-all text-left group"
            >
              <img
                v-if="recipe.image || recipe.image_url"
                :src="recipe.image || recipe.image_url"
                class="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div
                v-else
                class="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0"
              >
                🍽️
              </div>
              <div class="flex-grow">
                <h4
                  class="font-bold text-dark-green group-hover:text-primary-green transition-colors line-clamp-1"
                >
                  {{ recipe.title }}
                </h4>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span v-if="recipe.prep_time" class="flex items-center gap-1"
                    ><svg
                      class="w-3 h-3 text-primary-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path></svg
                    >{{ recipe.prep_time }}</span
                  >
                  <span v-if="recipe.prep_time && recipe.cook_time" class="text-gray-300">|</span>
                  <span v-if="recipe.cook_time" class="flex items-center gap-1"
                    ><svg
                      class="w-3 h-3 text-secondary-rust"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path></svg
                    >{{ recipe.cook_time }}</span
                  >
                </div>
              </div>
              <div
                class="text-primary-green opacity-0 group-hover:opacity-100 transition-opacity pr-2 shrink-0"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import LoadingState from '@/components/ui/LoadingState.vue'

// Strict internal interface for component inputs
interface Recipe {
  id?: number
  slug: string
  title: string
  image?: string | null
  image_url?: string | null
  prep_time?: string | null
  cook_time?: string | null
}

defineProps<{
  show: boolean
  title: string
  subtitle?: string
  recipes: Recipe[]
  isLoading?: boolean
  loadingText?: string
  noticeText?: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'select', slug: string): void
}>()
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
</style>
