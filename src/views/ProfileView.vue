<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20 relative">
    <!-- Top Spacer to match RecipesView.vue -->
    <div class="w-full h-4 md:h-28 shrink-0"></div>

    <div class="max-w-6xl w-full mx-auto px-4 pb-8 flex-grow flex flex-col items-center">
      <div class="bg-white p-6 md:p-8 lg:p-10 rounded-3xl shadow-sm border border-gray-100 w-full">
        <form @submit.prevent="saveProfile" class="space-y-8 md:space-y-10">
          <!-- Identity Header (Combined Read & Edit Mode) -->
          <div
            class="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 md:pb-8 border-b border-gray-100"
          >
            <!-- Avatar -->
            <div
              class="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center shrink-0 text-3xl font-bold uppercase shadow-inner relative"
            >
              {{ form.name ? form.name.charAt(0) : 'U' }}
              <!-- Tiny Premium Indicator on Avatar -->
              <div
                v-if="authStore.user?.is_premium"
                class="absolute -bottom-1 -right-1 bg-accent-gold text-white rounded-full p-1 border-2 border-white shadow-sm"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
            </div>

            <!-- Details / Inline Edit Form -->
            <div class="flex-grow w-full">
              <!-- Read-Only Mode -->
              <div v-if="!isEditingProfile" class="flex items-start justify-between gap-4 group">
                <div class="overflow-hidden">
                  <h2
                    class="text-3xl font-bold text-dark-green capitalize truncate transition-colors group-hover:text-primary-green"
                  >
                    {{ form.name || $t('profile.title', 'Profil') }}
                  </h2>
                  <p class="text-gray-500 mt-1 truncate">
                    {{ form.email }}
                  </p>

                  <!-- Membership Status Badge -->
                  <div class="mt-3 flex items-center gap-2">
                    <span
                      v-if="authStore.user?.is_premium"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-gold/10 text-yellow-700 border border-accent-gold/20 text-[10px] font-extrabold uppercase tracking-wider"
                    >
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      {{ $t('profile.status_premium', 'Premium Mitglied') }}
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-extrabold uppercase tracking-wider"
                    >
                      {{ $t('profile.status_free', 'Basis Account') }}
                    </span>
                  </div>
                </div>
                <!-- Edit Button -->
                <button
                  type="button"
                  @click="isEditingProfile = true"
                  class="shrink-0 p-2.5 text-gray-400 hover:text-primary-green hover:bg-bg-cream/50 rounded-xl transition-all"
                  :aria-label="$t('common.edit', 'Bearbeiten')"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Edit Mode -->
              <div
                v-else
                class="flex flex-col gap-3 bg-bg-cream/30 p-4 rounded-2xl border border-gray-100 relative"
              >
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">{{
                    $t('profile.account_settings', 'Account-Einstellungen')
                  }}</span>
                  <button
                    type="button"
                    @click="cancelProfileEdit"
                    class="text-xs font-bold text-gray-400 hover:text-secondary-rust transition-colors flex items-center gap-1"
                  >
                    {{ $t('common.cancel', 'Abbrechen') }}
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    :placeholder="$t('profile.name', 'Name')"
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-dark-green font-medium focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all shadow-sm"
                  />
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    :placeholder="$t('profile.email', 'E-Mail Adresse')"
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-dark-green font-medium focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Responsive 2-Column Grid on Desktop -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <!-- Left Column: Dietary & Preferences (COMPACT MODE) -->
            <section class="space-y-4">
              <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2">
                {{ $t('profile.dietary_info', 'Persönliche Präferenzen') }}
              </h3>

              <!-- One unified card for all preferences to save vertical space -->
              <div
                class="bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col divide-y divide-gray-200/60 overflow-hidden"
              >
                <!-- Diet Options -->
                <div
                  v-if="dietOptions.length > 0"
                  class="p-4 md:p-5 flex flex-col items-center text-center"
                >
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {{ $t('recipes.filters.groups.diets', 'Ernährungsweise') }}
                  </p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <button
                      v-for="diet in dietOptions"
                      :key="diet.value"
                      type="button"
                      @click="toggleArrayItem('dietary_preferences', diet.value)"
                      :class="[
                        'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all border flex items-center gap-1.5',
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

                <!-- Fitness & Macros Options -->
                <div
                  v-if="fitnessOptions.length > 0"
                  class="p-4 md:p-5 flex flex-col items-center text-center"
                >
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {{ $t('recipes.filters.groups.fitness', 'Fitness & Makros') }}
                  </p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <button
                      v-for="fitness in fitnessOptions"
                      :key="fitness.value"
                      type="button"
                      @click="toggleArrayItem('fitness_goals', fitness.value)"
                      :class="[
                        'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all border flex items-center gap-1.5',
                        form.fitness_goals.includes(fitness.value)
                          ? 'bg-primary-green text-white border-primary-green shadow-sm'
                          : 'bg-white text-dark-green/70 border-gray-200 hover:border-primary-green hover:text-primary-green',
                      ]"
                    >
                      <span>{{ fitness.icon }}</span>
                      <span>{{ $t(fitness.labelKey) }}</span>
                    </button>
                  </div>
                </div>

                <!-- Logistics / Everyday Options -->
                <div
                  v-if="logisticsOptions.length > 0"
                  class="p-4 md:p-5 flex flex-col items-center text-center"
                >
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {{ $t('recipes.filters.groups.logistics', 'Zubereitung & Alltag') }}
                  </p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <button
                      v-for="logistic in logisticsOptions"
                      :key="logistic.value"
                      type="button"
                      @click="toggleArrayItem('logistics_preferences', logistic.value)"
                      :class="[
                        'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all border flex items-center gap-1.5',
                        form.logistics_preferences.includes(logistic.value)
                          ? 'bg-primary-green text-white border-primary-green shadow-sm'
                          : 'bg-white text-dark-green/70 border-gray-200 hover:border-primary-green hover:text-primary-green',
                      ]"
                    >
                      <span>{{ logistic.icon }}</span>
                      <span>{{ $t(logistic.labelKey) }}</span>
                    </button>
                  </div>
                </div>

                <!-- Allergies (Rust Colored) -->
                <div
                  v-if="allergyOptions.length > 0"
                  class="p-4 md:p-5 bg-secondary-rust/5 flex flex-col items-center text-center"
                >
                  <p class="text-xs font-bold text-secondary-rust uppercase tracking-wider mb-3">
                    {{ $t('recipes.filters.groups.allergies', 'Allergien / Unverträglichkeiten') }}
                  </p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <button
                      v-for="allergy in allergyOptions"
                      :key="allergy.value"
                      type="button"
                      @click="toggleArrayItem('allergies', allergy.value)"
                      :class="[
                        'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all border flex items-center gap-1.5',
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

            <!-- Right Column: Planning Settings & Controls -->
            <div class="space-y-8 flex flex-col justify-between">
              <section class="space-y-4">
                <h3 class="text-lg font-bold text-dark-green border-b border-gray-100 pb-2">
                  {{ $t('profile.planning_settings', 'Planungs-Einstellungen') }}
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Target Meals Stepper -->
                  <div
                    class="p-4 md:p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
                  >
                    <label
                      class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block"
                    >
                      {{ $t('profile.target_meals', 'Mahlzeiten pro Woche') }}
                    </label>
                    <div
                      class="flex items-center justify-between w-full max-w-[10rem] bg-white border border-gray-200 rounded-2xl p-1 shadow-sm"
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
                      <span class="font-bold text-dark-green text-xl w-10 text-center">{{
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
                    class="p-4 md:p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
                  >
                    <label
                      class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block"
                    >
                      {{ $t('profile.default_portions', 'Standard Portionen') }}
                    </label>
                    <div
                      class="flex items-center justify-between w-full max-w-[10rem] bg-white border border-gray-200 rounded-2xl p-1 shadow-sm"
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
                      <span class="font-bold text-dark-green text-xl w-10 text-center">{{
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

                <!-- Food Waste Toggle -->
                <div
                  class="p-4 md:p-5 bg-bg-cream/30 rounded-2xl border border-gray-100 flex justify-between items-center text-left gap-4"
                >
                  <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {{ $t('profile.minimize_waste', 'Food Waste minimieren') }}
                    </p>
                    <p class="text-sm text-gray-500 leading-tight">
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
                    class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                    :class="form.minimize_food_waste ? 'bg-primary-green' : 'bg-gray-300'"
                  >
                    <span
                      class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="form.minimize_food_waste ? 'translate-x-5' : 'translate-x-0'"
                    ></span>
                  </button>
                </div>
              </section>

              <!-- Action Buttons -->
              <div class="pt-6 border-t border-gray-100 flex flex-col gap-3">
                <button
                  type="submit"
                  :disabled="isSaving || !hasChanges"
                  :class="[
                    'w-full py-3.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2',
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

                <button
                  type="button"
                  @click="showDeleteModal = true"
                  class="w-full py-3.5 bg-white text-secondary-rust font-bold rounded-xl border border-secondary-rust/30 hover:bg-secondary-rust hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
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
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modals -->
    <ConfirmModal
      :show="showEmailModal"
      :title="$t('profile.email_change_title', 'E-Mail-Adresse ändern?')"
      :description="
        $t(
          'profile.email_change_desc',
          'Nach dem Ändern deiner E-Mail-Adresse wirst du aus Sicherheitsgründen abgemeldet. Du musst deine neue Adresse über den zugesandten Link verifizieren, bevor du dich wieder einloggen kannst.',
        )
      "
      :confirmText="$t('profile.email_change_confirm', 'Ja, ändern & abmelden')"
      :cancelText="$t('common.cancel', 'Abbrechen')"
      @confirm="executeSave"
      @cancel="showEmailModal = false"
    />

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
import api from '@/services/api'
import { useCategories } from '@/composables/useCategories'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

const authStore = useAuthStore()
const router = useRouter()
const { categoryGroups, fetchCategories } = useCategories()

// UI State for combined click-to-edit identity field
const isEditingProfile = ref(false)

// Define allowed keys for array toggles
type ArrayFields = 'dietary_preferences' | 'fitness_goals' | 'logistics_preferences' | 'allergies'

// Function to generate a clean snapshot of the user's data
const getInitialState = () => ({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  target_meals_per_week: authStore.user?.target_meals_per_week || 3,
  default_portions: authStore.user?.default_portions || 2,
  dietary_preferences: [...(authStore.user?.dietary_preferences || [])].sort(),
  fitness_goals: [...(authStore.user?.fitness_goals || [])].sort(),
  logistics_preferences: [...(authStore.user?.logistics_preferences || [])].sort(),
  allergies: [...(authStore.user?.allergies || [])].sort(),
  minimize_food_waste: authStore.user?.minimize_food_waste ?? true,
})

// Keep a snapshot of the original state to compare against
const originalState = ref(getInitialState())
const form = reactive(getInitialState())

const isSaving = ref(false)
const showDeleteModal = ref(false)
const showEmailModal = ref(false)

// Reverts the identity fields back to original and closes the inputs
const cancelProfileEdit = () => {
  form.name = originalState.value.name
  form.email = originalState.value.email
  isEditingProfile.value = false
}

// Computed property checking for any modifications across all fields
const hasChanges = computed(() => {
  const currentState = {
    ...form,
    dietary_preferences: [...form.dietary_preferences].sort(),
    fitness_goals: [...form.fitness_goals].sort(),
    logistics_preferences: [...form.logistics_preferences].sort(),
    allergies: [...form.allergies].sort(),
  }
  return JSON.stringify(currentState) !== JSON.stringify(originalState.value)
})

// Extract option lists cleanly from the categoryGroups provided by useCategories
const dietOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'diets')?.items || []
  )
})

const fitnessOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'fitness_profiles')
      ?.items || []
  )
})

const logisticsOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'logistics')?.items || []
  )
})

const allergyOptions = computed(() => {
  return (
    categoryGroups.value.find((g) => (g as { rawKey?: string }).rawKey === 'allergies')?.items || []
  )
})

// Generic array toggler using strictly typed keys
const toggleArrayItem = (field: ArrayFields, value: string) => {
  const index = form[field].indexOf(value)
  if (index === -1) {
    form[field].push(value)
  } else {
    form[field].splice(index, 1)
  }
}

// Intercepts the save action to check if the email was modified
const saveProfile = () => {
  if (!hasChanges.value) return

  const emailChanged = form.email !== originalState.value.email
  if (emailChanged) {
    showEmailModal.value = true // Open confirmation if email changed
  } else {
    executeSave() // Save directly otherwise
  }
}

// Helper to extract only the meal planning preferences for comparison and API payload
const getPrefsOnly = (state: typeof form) => ({
  target_meals_per_week: state.target_meals_per_week,
  default_portions: state.default_portions,
  dietary_preferences: state.dietary_preferences,
  fitness_goals: state.fitness_goals,
  logistics_preferences: state.logistics_preferences,
  allergies: state.allergies,
  minimize_food_waste: state.minimize_food_waste,
})

// Executes the actual API calls
const executeSave = async () => {
  showEmailModal.value = false
  isSaving.value = true

  try {
    const nameChanged = form.name !== originalState.value.name
    const emailChanged = form.email !== originalState.value.email

    // Clean, type-safe comparison
    const prefsChanged =
      JSON.stringify(getPrefsOnly(originalState.value)) !== JSON.stringify(getPrefsOnly(form))

    // 1. Update Profile (Name/Email) if needed
    if (nameChanged || emailChanged) {
      const res = await api.put('/user/profile', { name: form.name, email: form.email })
      authStore.user = res.data.data
    }

    // 2. Update Preferences if needed
    if (prefsChanged) {
      await authStore.updateUserPreferences(form)
    }

    // 3. Handle successful save flow
    if (emailChanged) {
      // Log out user as the token/session needs to be re-verified
      await authStore.logout()
      router.push('/login')
    } else {
      // Reset the pristine state to disable the save button and close edit inputs
      originalState.value = getInitialState()
      isEditingProfile.value = false
    }
  } catch (err) {
    console.error('Failed to update profile:', err)
  } finally {
    isSaving.value = false
  }
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
