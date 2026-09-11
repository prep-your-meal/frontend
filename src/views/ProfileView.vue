<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20">
    <!-- Desktop Spacer -->
    <div class="hidden md:block w-full h-24 shrink-0"></div>

    <div class="max-w-6xl w-full mx-auto px-4 py-8 md:py-16 flex-grow flex flex-col items-center">
      <div
        class="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full"
      >
        <!-- Header: User Identity -->
        <div class="flex items-center gap-6 mb-10">
          <div
            class="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center shrink-0 text-3xl font-bold uppercase"
          >
            <!-- Dynamically show the first letter of the user's name, fallback to 'U' -->
            {{ authStore.user?.name ? authStore.user.name.charAt(0) : 'U' }}
          </div>
          <div class="overflow-hidden">
            <h2 class="text-3xl font-bold text-dark-green capitalize truncate">
              {{ authStore.user?.name || $t('profile.title', 'Profil') }}
            </h2>
            <p class="text-gray-500 mt-1 truncate">
              {{ authStore.user?.email }}
            </p>
          </div>
        </div>

        <div class="space-y-8">
          <!-- Section 1: Meal Planning Defaults -->
          <section>
            <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2 mb-4">
              {{ $t('profile.planning_settings', 'Planungs-Einstellungen') }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Target Meals -->
              <div class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100">
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                  {{ $t('profile.target_meals', 'Mahlzeiten pro Woche') }}
                </p>
                <p class="font-medium text-dark-green text-xl">
                  {{ authStore.user?.target_meals_per_week || 0 }}
                </p>
              </div>

              <!-- Default Portions -->
              <div class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100">
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                  {{ $t('profile.default_portions', 'Standard Portionen') }}
                </p>
                <p class="font-medium text-dark-green text-xl">
                  {{ authStore.user?.default_portions || 0 }}
                </p>
              </div>
            </div>
          </section>

          <!-- Section 2: Dietary & Allergies -->
          <section>
            <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2 mb-4">
              {{ $t('profile.dietary_info', 'Ernährung & Allergien') }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Diets -->
              <div class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100">
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {{ $t('profile.diet', 'Ernährungsweise') }}
                </p>
                <!-- Render array elements if they exist -->
                <div
                  v-if="authStore.user?.dietary_preferences?.length"
                  class="flex flex-wrap gap-2"
                >
                  <span
                    v-for="diet in authStore.user.dietary_preferences"
                    :key="diet"
                    class="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-dark-green"
                  >
                    {{ diet }}
                  </span>
                </div>
                <p v-else class="text-sm text-gray-400 italic">
                  {{ $t('profile.none_set', 'Keine hinterlegt') }}
                </p>
              </div>

              <!-- Allergies -->
              <div class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100">
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {{ $t('profile.allergies', 'Allergien / Unverträglichkeiten') }}
                </p>
                <div v-if="authStore.user?.allergies?.length" class="flex flex-wrap gap-2">
                  <span
                    v-for="allergy in authStore.user.allergies"
                    :key="allergy"
                    class="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-secondary-rust"
                  >
                    {{ allergy }}
                  </span>
                </div>
                <p v-else class="text-sm text-gray-400 italic">
                  {{ $t('profile.none_set', 'Keine hinterlegt') }}
                </p>
              </div>
            </div>
          </section>

          <!-- Section 3: App Preferences -->
          <section>
            <div
              class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-row justify-between items-center gap-4"
            >
              <div>
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                  {{ $t('profile.minimize_waste', 'Food Waste minimieren') }}
                </p>
                <p class="text-sm text-gray-500">
                  {{
                    $t(
                      'profile.minimize_waste_desc',
                      'Algorithmus bevorzugt Rezepte mit Restzutaten',
                    )
                  }}
                </p>
              </div>
              <!-- Status Indicator -->
              <div
                class="font-bold text-lg shrink-0"
                :class="
                  authStore.user?.minimize_food_waste ? 'text-primary-green' : 'text-gray-400'
                "
              >
                {{
                  authStore.user?.minimize_food_waste
                    ? $t('common.yes', 'Ja')
                    : $t('common.no', 'Nein')
                }}
              </div>
            </div>
          </section>

          <!-- Action Buttons -->
          <div class="pt-6 border-t border-gray-100">
            <!-- Adjusted logout button to match the global secondary-rust styling -->
            <button
              @click="handleLogout"
              class="w-full py-4 bg-white text-secondary-rust font-bold rounded-xl border border-secondary-rust/30 hover:bg-secondary-rust hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              {{ $t('profile.logout', 'Abmelden') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
