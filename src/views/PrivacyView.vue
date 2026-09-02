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
        <span>{{ $t('privacy.back') }}</span>
      </button>
    </div>

    <!-- Main Container -->
    <div
      class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-14 relative overflow-hidden"
    >
      <!-- Decorative Background Blob -->
      <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"
      ></div>

      <!-- Header -->
      <div
        class="pb-8 border-b border-gray-100 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <BrandName class="text-lg text-accent-gold mb-2" />
          <h1 class="text-4xl font-extrabold text-dark-green tracking-tight">
            {{ $t('privacy.title') }}
          </h1>
        </div>
      </div>

      <div class="mt-8 space-y-10 text-gray-600 leading-relaxed relative z-10">
        <!-- Section 1 -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-3">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm"
              >1</span
            >
            {{ $t('privacy.general.title') }}
          </h2>
          <p
            class="text-gray-700 bg-bg-cream/40 p-5 rounded-2xl border border-gray-50"
            v-html="
              $t('privacy.general.text', {
                brand: '<strong class=\'text-dark-green\'>PrepYourMeal</strong>',
              })
            "
          ></p>
        </section>

        <!-- Section 2 -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-3">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm"
              >2</span
            >
            {{ $t('privacy.hosting.title') }}
          </h2>
          <div class="space-y-4">
            <p class="text-gray-700">
              {{ $t('privacy.hosting.text1') }}<br />
              <strong class="text-dark-green block mt-2">STRATO AG</strong>
              Otto-Ostrowski-Straße 7<br />
              10249 Berlin, Germany
            </p>
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
              <svg
                class="w-5 h-5 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {{ $t('privacy.hosting.text2') }}
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-4 flex items-center gap-3">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm"
              >3</span
            >
            {{ $t('privacy.account.title') }}
          </h2>
          <p class="text-gray-700 leading-relaxed">
            {{ $t('privacy.account.text') }}
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
  document.title = `${t('privacy.title')} | PrepYourMeal`
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
