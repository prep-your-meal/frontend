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
          {{ locale === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy' }}
        </h1>
      </div>

      <!-- German Version -->
      <div
        v-if="locale === 'de'"
        class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed"
      >
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >1</span
            >
            Allgemeine Hinweise
          </h2>
          <p>
            Wir freuen uns über dein Interesse an
            <strong class="text-dark-green">PrepYourMeal</strong>. Der Schutz deiner persönlichen
            Daten ist uns ein wichtiges Anliegen. Die folgenden Hinweise geben einen einfachen
            Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese
            Website besuchst.
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >2</span
            >
            Hosting
          </h2>
          <div class="space-y-2">
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br />
              <strong class="text-dark-green">STRATO AG</strong>, Otto-Ostrowski-Straße 7, 10249
              Berlin.
            </p>
            <p class="text-sm text-gray-500">
              Wenn du unsere Website besuchst, erfasst Strato Server-Logfiles inklusive deiner
              IP-Adresse. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund
              unseres berechtigten Interesses an einer zuverlässigen Bereitstellung. Ein Vertrag
              über Auftragsverarbeitung (AVV) liegt vor.
            </p>
          </div>
        </section>

        <section class="py-5 last:pb-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >3</span
            >
            Registrierung und Nutzerkonto
          </h2>
          <p>
            Bei einer Registrierung werden die eingegebenen Daten (E-Mail-Adresse und
            verschlüsseltes Passwort) ausschließlich zur Bereitstellung deines Accounts und zur
            Speicherung deiner Rezepte verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
        </section>
      </div>

      <!-- English Version -->
      <div v-else class="mt-6 divide-y divide-gray-100 text-gray-600 leading-relaxed">
        <section class="py-5 first:pt-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >1</span
            >
            General Information
          </h2>
          <p>
            Thank you for your interest in <strong class="text-dark-green">PrepYourMeal</strong>.
            Protecting your personal data is a priority. The following information provides an
            overview of how your data is handled when visiting this website.
          </p>
        </section>

        <section class="py-5">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >2</span
            >
            Hosting
          </h2>
          <div class="space-y-2">
            <p>
              We host the content of our website with:<br />
              <strong class="text-dark-green">STRATO AG</strong>, Otto-Ostrowski-Straße 7, 10249
              Berlin, Germany.
            </p>
            <p class="text-sm text-gray-500">
              When you visit our site, Strato collects log files including IP addresses. This is
              based on Art. 6(1)(f) GDPR. A Data Processing Agreement (DPA) is in place.
            </p>
          </div>
        </section>

        <section class="py-5 last:pb-0">
          <h2 class="text-lg font-bold text-dark-green mb-2 flex items-center gap-2">
            <span
              class="text-primary-green text-xs font-mono font-bold bg-primary-green/10 px-2.5 py-0.5 rounded-md"
              >3</span
            >
            Registrierung und Nutzerkonto
          </h2>
          <p>
            When creating an account, submitted data (email address and encrypted password) is used
            strictly to provide your profile and store meal plans (Art. 6(1)(b) GDPR).
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
    locale.value === 'de' ? 'Datenschutz | PrepYourMeal' : 'Privacy Policy | PrepYourMeal'
}

onMounted(updateTitle)
watch(locale, updateTitle)
onUnmounted(() => {
  document.title = originalTitle
})
</script>
