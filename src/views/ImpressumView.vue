<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <!-- Back Link (Hover is now accent-gold) -->
    <div class="mb-6">
      <RouterLink
        to="/"
        class="inline-flex items-center text-primary-green hover:text-accent-gold transition-colors font-medium cursor-pointer"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span v-if="locale === 'de'">Zurück</span>
        <span v-else>Back</span>
      </RouterLink>
    </div>

    <!-- Content Box -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
      <!-- Header Row -->
      <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6 gap-4">
        <h1
          class="text-3xl font-bold text-dark-green border-b-[3px] border-primary-green pb-2 mb-0"
        >
          <template v-if="locale === 'de'">Impressum</template>
          <template v-else>Legal Notice</template>
        </h1>

        <RouterLink to="/" class="shrink-0">
          <img
            src="@/assets/images/prepyourmeal_logo.png"
            alt="PrepYourMeal Logo"
            class="w-28 sm:w-36 h-auto block"
          />
        </RouterLink>
      </div>

      <!-- ========================================== -->
      <!-- GERMAN VERSION                             -->
      <!-- ========================================== -->
      <div v-if="locale === 'de'">
        <!-- changed prose-blue to prose-green -->
        <div class="prose prose-green max-w-none text-gray-700">
          <p class="font-bold">Angaben gemäß § 5 DDG:</p>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)
          </p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">Kontakt</h3>
          <p>E-Mail: [Deine E-Mail-Adresse, z.B. hello@prep-my-meal.de]<br /></p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h3>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)
          </p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">Urheberrecht</h3>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- ENGLISH VERSION                            -->
      <!-- ========================================== -->
      <div v-else>
        <!-- changed prose-blue to prose-green -->
        <div class="prose prose-green max-w-none text-gray-700">
          <p class="font-bold">Information pursuant to § 5 DDG:</p>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">Contact</h3>
          <p>E-Mail: [Your E-Mail Address]<br /></p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">
            Responsible for content according to § 18 para. 2 MStV
          </h3>
          <p>
            Sven Fehr<br />
            Am Dachspfad 14<br />
            61169 Friedberg (Hessen)<br />
            Germany
          </p>

          <h3 class="text-xl font-bold text-dark-green mt-8 mb-4">Copyright</h3>
          <p>
            The content and works published on this website are governed by the copyright laws of
            Germany. Any duplication, processing, distribution, or any form of utilization beyond
            the scope of copyright law shall require the prior written consent of the author or
            authors in question.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { locale } = useI18n()
const originalPageTitle = document.title

const updateTitle = () => {
  document.title =
    locale.value === 'de' ? 'Impressum | PrepYourMeal' : 'Legal Notice | PrepYourMeal'
}

onMounted(() => {
  updateTitle()
})

watch(locale, () => {
  updateTitle()
})

onUnmounted(() => {
  document.title = originalPageTitle
})
</script>
