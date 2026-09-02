<template>
  <div class="flex flex-col items-center justify-center w-full px-4 py-8 md:py-12 flex-grow">
    <!-- Main Card (Aligned with Login/Register styling) -->
    <div
      class="w-full max-w-3xl bg-white px-6 sm:px-12 py-10 rounded-3xl shadow-sm border-t-[8px] border-primary-green relative overflow-hidden"
    >
      <!-- Decorative Background Blob -->
      <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none"
      ></div>

      <!-- Unified Header with integrated Back Button -->
      <div class="relative flex justify-center items-center mb-8 z-10">
        <!-- Native-style Back Button -->
        <button
          @click="goBack"
          class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-bg-cream/50 text-dark-green rounded-full border border-gray-100 shadow-sm hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
          :aria-label="$t('impressum.back')"
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

      <!-- Page Title -->
      <h1
        class="text-3xl md:text-4xl font-extrabold text-dark-green text-center mb-8 pb-8 border-b border-gray-100 relative z-10"
      >
        {{ $t('impressum.title') }}
      </h1>

      <!-- Content Area -->
      <div class="space-y-10 text-gray-600 leading-relaxed relative z-10">
        <!-- DDG Section -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-2">
            <svg
              class="w-6 h-6 text-accent-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
            {{ $t('impressum.ddg') }}
          </h2>
          <p class="text-gray-700 bg-bg-cream/40 p-5 rounded-2xl border border-gray-50">
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <!-- Contact Section -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-2">
            <svg
              class="w-6 h-6 text-primary-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            {{ $t('impressum.contact') }}
          </h2>
          <p class="flex items-center gap-2">
            <span class="font-medium text-gray-500">{{ $t('impressum.email') }}</span>
            <a
              href="mailto:hello@prepyourmeal.de"
              class="text-primary-green font-semibold hover:text-dark-green hover:underline transition-colors"
            >
              hello@prepyourmeal.de
            </a>
          </p>
        </section>

        <!-- MStV Section -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-2">
            <svg
              class="w-6 h-6 text-secondary-rust"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            {{ $t('impressum.mstv') }}
          </h2>
          <p class="text-gray-700 bg-bg-cream/40 p-5 rounded-2xl border border-gray-50">
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <!-- Copyright Section -->
        <section class="pt-4 border-t border-gray-100">
          <h2 class="text-lg font-bold text-dark-green mb-2">{{ $t('impressum.copyright') }}</h2>
          <p class="text-sm text-gray-500">
            {{ $t('impressum.copyright_text') }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BrandName from '@/components/ui/BrandName.vue'

const { t, locale } = useI18n()
const router = useRouter()
const originalTitle = document.title

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/')
  }
}

const updateTitle = () => {
  document.title = `${t('impressum.title')} | PrepYourMeal`
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
