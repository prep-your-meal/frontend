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
        <span>{{ $t('impressum.back') }}</span>
      </RouterLink>
    </div>

    <!-- Main Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 flex-grow">
      <!-- Header -->
      <div class="pb-6 border-b border-gray-100">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-dark-green">
          {{ $t('impressum.title') }}
        </h1>
      </div>

      <div class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed">
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2">{{ $t('impressum.ddg') }}</h2>
          <p class="text-gray-700">
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">{{ $t('impressum.contact') }}</h2>
          <p>
            {{ $t('impressum.email') }}
            <a href="mailto:hello@prepyourmeal.de" class="text-primary-green hover:underline">
              hello@prepyourmeal.de
            </a>
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">
            {{ $t('impressum.mstv') }}
          </h2>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <section class="py-5 last:pb-0">
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
import { RouterLink } from 'vue-router'

const { t, locale } = useI18n()
const originalTitle = document.title

const updateTitle = () => {
  document.title = `${t('impressum.title')} | PrepYourMeal`
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
