<template>
  <div class="max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full flex-grow flex flex-col">
    <!-- Back Navigation (Floating Pill) -->
    <div class="mb-8">
      <button
        @click="goBack"
        class="inline-flex items-center px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-bold text-dark-green hover:text-primary-green hover:shadow-md hover:-translate-y-0.5 transition-all group"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-400 group-hover:text-primary-green transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>{{ $t('impressum.back') }}</span>
      </button>
    </div>

    <!-- Main Container -->
    <div
      class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-14 relative overflow-hidden"
    >
      <!-- Decorative Background Blob -->
      <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl pointer-events-none"
      ></div>

      <!-- Header -->
      <div
        class="pb-8 border-b border-gray-100 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <BrandName class="text-lg text-primary-green mb-2" />
          <h1 class="text-4xl font-extrabold text-dark-green tracking-tight">
            {{ $t('impressum.title') }}
          </h1>
        </div>
      </div>

      <div class="mt-8 space-y-10 text-gray-600 leading-relaxed relative z-10">
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

// Intelligenter Back-Button: Geht in der Historie zurück, oder auf die Startseite
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
