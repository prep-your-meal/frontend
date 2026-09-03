<template>
  <div class="flex flex-col items-center w-full md:px-4 py-8 md:py-12 flex-grow">
    <!-- Main Container -->
    <div
      class="w-full max-w-3xl pt-2 pb-10 md:p-12 relative md:bg-white md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:border-t-[8px] md:border-t-primary-green"
    >
      <!-- Decorative Background Blob -->
      <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none hidden md:block"
      ></div>

      <!-- Unified Header -->
      <FocusHeader class="px-4 md:px-0" />

      <!-- Page Title -->
      <h1
        class="text-3xl md:text-4xl font-extrabold text-dark-green text-center mb-10 pb-8 border-b border-gray-200/60 md:border-gray-100 relative z-10 px-4 md:px-0"
      >
        {{ $t('privacy.title') }}
      </h1>

      <!-- Content Area -->
      <div class="space-y-12 text-gray-600 leading-relaxed relative z-10">
        <!-- Section 1 -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-6 flex items-center gap-3 px-4 md:px-0">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm shrink-0"
              >1</span
            >
            {{ $t('privacy.general.title') }}
          </h2>
          <p
            class="text-gray-700 bg-white md:bg-bg-cream/40 px-6 py-6 md:p-8 rounded-none md:rounded-2xl shadow-sm md:shadow-none border-y md:border border-gray-100 md:border-gray-50"
            v-html="
              $t('privacy.general.text', {
                brand: '<strong class=\'text-dark-green\'>PrepYourMeal</strong>',
              })
            "
          ></p>
        </section>

        <!-- Section 2 -->
        <section>
          <h2 class="text-xl font-bold text-dark-green mb-6 flex items-center gap-3 px-4 md:px-0">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm shrink-0"
              >2</span
            >
            {{ $t('privacy.hosting.title') }}
          </h2>
          <div class="space-y-6">
            <p class="text-gray-700 px-4 md:px-0">
              {{ $t('privacy.hosting.text1') }}<br />
              <strong class="text-dark-green block mt-2">STRATO AG</strong>
              Otto-Ostrowski-Straße 7<br />
              10249 Berlin, Germany
            </p>
            <div
              class="px-6 py-6 md:p-8 bg-white md:bg-gray-50 rounded-none md:rounded-2xl shadow-sm md:shadow-none border-y md:border border-gray-100 text-sm text-gray-500"
            >
              <svg
                class="w-6 h-6 text-gray-400 mb-3"
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
          <h2 class="text-xl font-bold text-dark-green mb-6 flex items-center gap-3 px-4 md:px-0">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-green/10 text-primary-green font-mono text-sm shrink-0"
              >3</span
            >
            {{ $t('privacy.account.title') }}
          </h2>
          <p class="text-gray-700 leading-relaxed px-4 md:px-0">
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
import FocusHeader from '@/components/ui/FocusHeader.vue'

const { t, locale } = useI18n()
const originalTitle = document.title

const updateTitle = () => {
  document.title = `${t('privacy.title')} | PrepYourMeal`
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
