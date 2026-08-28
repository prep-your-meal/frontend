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
        <span>{{ locale === 'de' ? 'Zurück zur Startseite' : 'Back to Home' }}</span>
      </RouterLink>
    </div>

    <!-- Main Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 flex-grow">
      <!-- Header (Dachzeile entfernt) -->
      <div class="pb-6 border-b border-gray-100">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-dark-green">
          {{ locale === 'de' ? 'Impressum' : 'Legal Notice' }}
        </h1>
      </div>

      <!-- German Version -->
      <div
        v-if="locale === 'de'"
        class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed"
      >
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2">Angaben gemäß § 5 DDG</h2>
          <p class="text-gray-700">
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">Kontakt</h2>
          <p>
            E-Mail:
            <a href="mailto:hello@prepyourmeal.de" class="text-primary-green hover:underline"
              >hello@prepyourmeal.de</a
            >
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)
          </p>
        </section>

        <section class="py-5 last:pb-0">
          <h2 class="text-lg font-bold text-dark-green mb-2">Urheberrecht</h2>
          <p class="text-sm text-gray-500">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>

      <!-- English Version -->
      <div v-else class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed">
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2">Information pursuant to § 5 DDG</h2>
          <p class="text-gray-700">
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">Contact</h2>
          <p>
            Email:
            <a href="mailto:hello@prepyourmeal.de" class="text-primary-green hover:underline"
              >hello@prepyourmeal.de</a
            >
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2">
            Responsible for content according to § 18 para. 2 MStV
          </h2>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>
        </section>

        <section class="py-5 last:pb-0">
          <h2 class="text-lg font-bold text-dark-green mb-2">Copyright</h2>
          <p class="text-sm text-gray-500">
            The content and works published on this website are governed by the copyright laws of
            Germany. Any duplication, processing, distribution, or any form of utilization beyond
            the scope of copyright law requires prior written consent.
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

const { locale } = useI18n()
const originalTitle = document.title

const updateTitle = () => {
  document.title =
    locale.value === 'de' ? 'Impressum | PrepYourMeal' : 'Legal Notice | PrepYourMeal'
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
