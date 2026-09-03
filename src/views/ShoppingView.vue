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

      <div class="shopping-list flex-grow flex flex-col relative z-10">
        <h2 class="text-3xl font-bold text-dark-green mb-4">
          {{ $t('shopping.title', 'Einkaufsliste') }} 🛒
        </h2>
        <p class="text-gray-600 mb-8">
          {{ $t('shopping.protected_text', 'Hier entsteht deine smarte Einkaufsliste.') }}
        </p>

        <div
          class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-grow flex items-center justify-center"
        >
          <p class="text-gray-400 italic text-lg text-center">
            {{ $t('shopping.empty_list', 'Noch keine Zutaten auf deiner Liste...') }}
          </p>
        </div>
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
        <!-- Decorative Background Blob -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none hidden md:block"
        ></div>

        <!-- Unified Header -->
        <MobileHeader />

        <!-- Content -->
        <div
          class="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-4 px-4 md:px-0 relative z-10"
        >
          <!-- Icon -->
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

          <!-- Copy -->
          <h2 class="text-3xl font-extrabold text-dark-green mb-4">
            {{ $t('shopping.teaser_title', 'Deine intelligente Einkaufsliste') }}
          </h2>
          <p class="text-gray-500 text-lg mb-10 leading-relaxed">
            {{
              $t(
                'shopping.teaser_desc',
                'Füge Zutaten mit einem Klick aus Rezepten hinzu und hake sie direkt im Supermarkt ab. Erstelle einen kostenlosen Account, um loszulegen.',
              )
            }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <RouterLink
              to="/register"
              class="flex-1 flex justify-center items-center text-center bg-primary-green text-white font-bold px-8 py-3.5 rounded-xl hover:bg-dark-green transition-colors shadow-sm"
            >
              {{ $t('shopping.teaser_register', 'Kostenlos registrieren') }}
            </RouterLink>
            <RouterLink
              to="/login"
              class="flex-1 flex justify-center items-center text-center bg-white md:bg-gray-50 text-dark-green font-bold px-8 py-3.5 rounded-xl border border-gray-200 hover:border-primary-green hover:text-primary-green transition-colors shadow-sm"
            >
              {{ $t('shopping.teaser_login', 'Anmelden') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import MobileHeader from '@/components/ui/MobileHeader.vue'

const authStore = useAuthStore()
</script>
