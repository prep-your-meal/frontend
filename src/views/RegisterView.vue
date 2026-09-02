<template>
  <!-- Reduced padding, added flex-grow to push footer down without scrolling -->
  <div class="flex flex-col items-center justify-center w-full px-4 py-8 flex-grow">
    <!-- Register/Beta Card -->
    <div
      class="w-full max-w-md bg-white px-8 py-10 rounded-3xl shadow-sm border-t-[8px] border-primary-green relative text-center"
    >
      <!-- Unified Header with integrated Back Button -->
      <div class="relative flex justify-center items-center mb-8 z-10">
        <!-- Native-style Back Button -->
        <button
          @click="goBack"
          class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-bg-cream/50 text-dark-green rounded-full border border-gray-100 shadow-sm hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
          :aria-label="$t('register.back', 'Zurück')"
        >
          <svg class="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Centered Logo & Brand -->
        <div class="flex flex-col items-center">
          <img
            src="@/assets/images/prepyourmeal_logo.svg"
            alt="PrepYourMeal Logo"
            class="h-16 w-auto drop-shadow-sm mb-2"
          />
          <BrandName class="text-xl text-primary-green" />
        </div>
      </div>

      <!-- Header -->
      <h1 class="text-2xl md:text-3xl font-extrabold text-dark-green mb-4">
        {{ $t('register.title') }}
      </h1>

      <!-- Lock Icon (Accent Gold) -->
      <div class="flex justify-center mb-6">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 text-accent-gold"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Beta Info Text -->
      <p class="text-gray-600 mb-8 leading-relaxed">
        {{ $t('register.thanks') }}
      </p>

      <!-- Email Action Button -->
      <a
        href="mailto:hello@prepyourmeal.de?subject=Teilnahme%20Closed-Beta"
        class="inline-flex justify-center items-center w-full bg-primary-green text-white font-bold text-lg py-3.5 px-4 rounded-2xl hover:bg-dark-green hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ring-4 ring-primary-green/20 mb-8"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        hello@prepyourmeal.de
      </a>

      <!-- Back Link to Login -->
      <div class="border-t border-gray-100 pt-6">
        <RouterLink
          to="/login"
          class="text-primary-green font-medium hover:text-accent-gold transition-colors"
        >
          {{ $t('register.back_to_login') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BrandName from '@/components/ui/BrandName.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
