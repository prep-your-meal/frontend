<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20 relative">
    <div class="hidden md:block w-full h-24 shrink-0"></div>

    <div class="max-w-6xl w-full mx-auto px-4 py-8 md:py-16 flex-grow flex flex-col items-center">
      <div
        class="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full"
      >
        <!-- Header -->
        <div class="flex items-center gap-6 mb-10">
          <div
            class="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center shrink-0 text-3xl font-bold uppercase"
          >
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

        <!-- Settings Form -->
        <form @submit.prevent="saveProfile" class="space-y-8">
          <!-- Section 1: Meal Planning Defaults -->
          <section>
            <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2 mb-4">
              {{ $t('profile.planning_settings', 'Planungs-Einstellungen') }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Target Meals Stepper -->
              <div
                class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
              >
                <label class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 block">
                  {{ $t('profile.target_meals', 'Mahlzeiten pro Woche') }}
                </label>
                <div
                  class="flex items-center justify-between w-full max-w-[12rem] bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm"
                >
                  <button
                    type="button"
                    @click="form.target_meals_per_week > 1 && form.target_meals_per_week--"
                    :disabled="form.target_meals_per_week <= 1"
                    class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-green hover:bg-bg-cream/50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <span class="font-bold text-dark-green text-2xl w-12 text-center">{{
                    form.target_meals_per_week
                  }}</span>
                  <button
                    type="button"
                    @click="form.target_meals_per_week < 21 && form.target_meals_per_week++"
                    :disabled="form.target_meals_per_week >= 21"
                    class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-green hover:bg-bg-cream/50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
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
                </div>
              </div>

              <!-- Default Portions Stepper -->
              <div
                class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
              >
                <label class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 block">
                  {{ $t('profile.default_portions', 'Standard Portionen') }}
                </label>
                <div
                  class="flex items-center justify-between w-full max-w-[12rem] bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm"
                >
                  <button
                    type="button"
                    @click="form.default_portions > 1 && form.default_portions--"
                    :disabled="form.default_portions <= 1"
                    class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-green hover:bg-bg-cream/50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <span class="font-bold text-dark-green text-2xl w-12 text-center">{{
                    form.default_portions
                  }}</span>
                  <button
                    type="button"
                    @click="form.default_portions < 10 && form.default_portions++"
                    :disabled="form.default_portions >= 10"
                    class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-green hover:bg-bg-cream/50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
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
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2: Dietary & Allergies -->
          <section>
            <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2 mb-4">
              {{ $t('profile.dietary_info', 'Ernährung & Allergien') }}
            </h3>
            <div class="space-y-4">
              <div
                class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
              >
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  {{ $t('profile.diet', 'Ernährungsweise') }}
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <button
                    v-for="diet in dietOptions"
                    :key="diet.value"
                    type="button"
                    @click="toggleArrayItem('dietary_preferences', diet.value)"
                    :class="[
                      'px-4 py-2 rounded-full text-sm font-semibold transition-all border flex items-center gap-2',
                      form.dietary_preferences.includes(diet.value)
                        ? 'bg-primary-green text-white border-primary-green shadow-sm'
                        : 'bg-white text-dark-green/70 border-gray-200 hover:border-primary-green hover:text-primary-green',
                    ]"
                  >
                    <span>{{ diet.icon }}</span>
                    <span>{{ $t(diet.labelKey) }}</span>
                  </button>
                </div>
              </div>

              <div
                class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
              >
                <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  {{ $t('profile.allergies', 'Allergien / Unverträglichkeiten') }}
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <button
                    v-for="allergy in allergyOptions"
                    :key="allergy.value"
                    type="button"
                    @click="toggleArrayItem('allergies', allergy.value)"
                    :class="[
                      'px-4 py-2 rounded-full text-sm font-semibold transition-all border flex items-center gap-2',
                      form.allergies.includes(allergy.value)
                        ? 'bg-secondary-rust text-white border-secondary-rust shadow-sm'
                        : 'bg-white text-dark-green/70 border-gray-200 hover:border-secondary-rust hover:text-secondary-rust',
                    ]"
                  >
                    <span>{{ allergy.icon }}</span>
                    <span>{{ $t(allergy.labelKey) }}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3: App Preferences -->
          <section>
            <div
              class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
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
              <button
                type="button"
                @click="form.minimize_food_waste = !form.minimize_food_waste"
                class="relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                :class="form.minimize_food_waste ? 'bg-primary-green' : 'bg-gray-300'"
              >
                <span
                  class="pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="form.minimize_food_waste ? 'translate-x-6' : 'translate-x-0'"
                ></span>
              </button>
            </div>
          </section>

          <!-- Action Buttons -->
          <div class="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <!-- Smart Save Button: Only active when hasChanges is true -->
            <button
              type="submit"
              :disabled="isSaving || !hasChanges"
              :class="[
                'w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2',
                hasChanges
                  ? 'bg-primary-green text-white hover:bg-dark-green shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70',
              ]"
            >
              {{
                isSaving
                  ? $t('common.saving', 'Speichern...')
                  : $t('profile.save', 'Änderungen speichern')
              }}
            </button>

            <!-- Styled Delete Account Button -->
            <button
              type="button"
              @click="showDeleteModal = true"
              class="w-full py-4 bg-white text-secondary-rust font-bold rounded-xl border border-secondary-rust/30 hover:bg-secondary-rust hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              {{ $t('profile.delete_account', 'Konto löschen') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Reusable Confirm Modal for Account Deletion -->
    <ConfirmModal
      :show="showDeleteModal"
      :title="$t('profile.delete_confirm_title', 'Konto wirklich löschen?')"
      :description="
        $t(
          'profile.delete_confirm_desc',
          'Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Pläne und Favoriten gehen verloren.',
        )
      "
      :confirmText="$t('profile.delete_confirm_btn', 'Ja, endgültig löschen')"
      :cancelText="$t('common.cancel', 'Abbrechen')"
      @confirm="confirmDeleteAccount"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useCategories } from '@/composables/useCategories'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

const authStore = useAuthStore()
const router = useRouter()
const { categoryGroups, fetchCategories } = useCategories()

// Function to generate a clean snapshot of the user's data
const getInitialState = () => ({
  target_meals_per_week: authStore.user?.target_meals_per_week || 3,
  default_portions: authStore.user?.default_portions || 2,
  // Sort arrays to ensure consistent stringification for the dirty-check
  dietary_preferences: [...(authStore.user?.dietary_preferences || [])].sort(),
  allergies: [...(authStore.user?.allergies || [])].sort(),
  minimize_food_waste: authStore.user?.minimize_food_waste ?? true,
})

// Keep a snapshot of the original state to compare against
const originalState = ref(getInitialState())
const form = reactive(getInitialState())

const isSaving = ref(false)
const showDeleteModal = ref(false)

// Computed property checking for any modifications
const hasChanges = computed(() => {
  const currentState = {
    ...form,
    dietary_preferences: [...form.dietary_preferences].sort(),
    allergies: [...form.allergies].sort(),
  }
  return JSON.stringify(currentState) !== JSON.stringify(originalState.value)
})

const dietOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'diets')?.items || []
  )
})

const allergyOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'allergies')?.items || []
  )
})

const toggleArrayItem = (field: 'dietary_preferences' | 'allergies', value: string) => {
  const index = form[field].indexOf(value)
  if (index === -1) {
    form[field].push(value)
  } else {
    form[field].splice(index, 1)
  }
}

const saveProfile = async () => {
  if (!hasChanges.value) return

  isSaving.value = true
  // Assuming authStore.updateProfile returns a success boolean or you await it safely
  await authStore.updateProfile(form)

  // Reset the "original" state to the newly saved state so the button disables again
  originalState.value = getInitialState()
  isSaving.value = false
}

const confirmDeleteAccount = async () => {
  try {
    await authStore.deleteAccount()
    showDeleteModal.value = false
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  if (categoryGroups.value.length === 0) {
    fetchCategories()
  }
})
</script>
