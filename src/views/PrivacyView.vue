<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full flex-grow flex flex-col justify-between">
    <!-- Back Navigation -->
    <div class="mb-6">
      <RouterLink
        to="/"
        class="inline-flex items-center text-sm font-semibold text-primary-green hover:text-accent-gold transition-all group"
      >
        <svg
          class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
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
      </RouterLink>
    </div>

    <!-- Main Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 flex-grow">
      <!-- Header -->
      <div class="pb-6 border-b border-gray-100">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-dark-green">
          {{ $t('privacy.title') }}
        </h1>
      </div>

      <div class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed">
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >1</span
            >
            {{ $t('privacy.general.title') }}
          </h2>
          <!-- Note the usage of dynamic interpolation here -->
          <p
            v-html="
              $t('privacy.general.text', {
                brand: '<strong class=\'text-dark-green\'>PrepYourMeal</strong>',
              })
            "
          ></p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >2</span
            >
            {{ $t('privacy.hosting.title') }}
          </h2>
          <div class="space-y-2">
            <p>
              {{ $t('privacy.hosting.text1') }}<br />
              <strong class="text-dark-green">STRATO AG</strong>, Otto-Ostrowski-Straße 7, 10249
              Berlin, Germany.
            </p>
            <p class="text-sm text-gray-500">
              {{ $t('privacy.hosting.text2') }}
            </p>
          </div>
        </section>

        <section class="py-5 last:pb-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >3</span
            >
            {{ $t('privacy.account.title') }}
          </h2>
          <p>
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
import { RouterLink } from 'vue-router'

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
