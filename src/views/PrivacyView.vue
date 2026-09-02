<template>
  <div class="flex flex-col items-center justify-center w-full px-4 py-8 md:py-12 flex-grow">
    <!-- Main Card (Aligned with Login/Register styling) -->
    <div
      class="w-full max-w-3xl bg-white px-6 sm:px-12 py-10 rounded-3xl shadow-sm border-t-[8px] border-primary-green relative overflow-hidden"
    >
      <!-- Decorative Background Blob -->
      <div
        class="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"
      ></div>

      <!-- Unified Header with integrated Back Button -->
      <div class="relative flex justify-center items-center mb-8 z-10">
        <!-- Native-style Back Button -->
        <button
          @click="goBack"
          class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-bg-cream/50 text-dark-green rounded-full border border-gray-100 shadow-sm hover:bg-primary-green hover:text-white hover:border-primary-green transition-all"
          :aria-label="$t('privacy.back')"
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
          <BrandName class="text-xl text-accent-gold" />
        </div>
      </div>

      <!-- Page Title -->
      <h1
        class="text-3xl md:text-4xl font-extrabold text-dark-green text-center mb-8 pb-8 border-b border-gray-100 relative z-10"
      >
        {{ $t('privacy.title') }}
      </h1>

      <!-- Content Area -->
      <div class="space-y-10 text-gray-600 leading-relaxed relative z-10">
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
