<template>
  <div class="w-full flex-grow flex flex-col bg-bg-cream/20">
    <!-- Desktop Spacer -->
    <div class="hidden md:block w-full h-24 shrink-0"></div>

    <div class="max-w-6xl w-full mx-auto px-4 py-8 md:py-16 flex-grow flex flex-col items-center">
      <div
        class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full"
      >
        <!-- Header -->
        <div class="flex items-center gap-6 mb-10">
          <div
            class="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center shrink-0"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-dark-green">{{ $t('profile.title', 'Profil') }}</h2>
            <p class="text-gray-500 mt-1">
              {{ $t('profile.subtitle', 'Deine persönlichen Einstellungen') }}
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Placeholder: User Data -->
          <div class="p-5 bg-bg-cream/30 rounded-2xl border border-gray-100">
            <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
              {{ $t('profile.email', 'E-Mail Adresse') }}
            </p>
            <!-- Ersetze dies später durch authStore.user?.email, sobald dein Backend läuft -->
            <p class="font-medium text-dark-green text-lg">user@example.com</p>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6 border-t border-gray-100">
            <button
              @click="handleLogout"
              class="w-full py-4 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
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
