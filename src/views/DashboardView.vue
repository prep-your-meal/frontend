<template>
  <div class="w-full flex-grow flex flex-col">
    <!-- ==============================================
         AUTHENTICATED STATE (User is logged in)
         ============================================== -->
    <div
      v-if="authStore.isAuthenticated"
      class="max-w-6xl w-full mx-auto px-4 py-8 flex-grow flex flex-col"
    >
      <!-- Desktop Spacer -->
      <div class="hidden md:block w-full h-24 shrink-0"></div>

      <div class="dashboard relative z-10">
        <h2 class="text-3xl font-bold text-dark-green mb-4">
          {{ $t('dashboard.title', 'Dashboard') }} 🔓
        </h2>
        <p class="text-gray-600 mb-8">
          {{ $t('dashboard.protected_text', 'Hier entsteht dein Wochenplaner.') }}
        </p>
        <button
          @click="handleLogout"
          class="px-6 py-2 bg-secondary-rust text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          {{ $t('dashboard.logout', 'Abmelden') }}
        </button>
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
        class="w-full max-w-3xl pt-2 pb-10 md:py-10 relative md:bg-white md:px-12 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:border-t-[8px] md:border-t-primary-green"
      >
        <!-- Decorative Background Blob -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none hidden md:block"
        ></div>

        <!-- Content -->
        <div
          class="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-4 px-4 md:px-0 relative z-10"
        >
          <!-- Icon -->
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

          <!-- Copy -->
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

          <!-- CTAs -->
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
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
