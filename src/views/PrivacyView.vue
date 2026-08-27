<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <!-- Back Link (Outside Content Box) -->
    <div class="mb-6">
      <RouterLink
        to="/"
        class="inline-flex items-center text-primary-green hover:text-dark-green transition-colors font-medium cursor-pointer"
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
      <!-- Header Row: Title on the left, Logo on the right -->
      <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-6 gap-4">
        <h1
          class="text-3xl font-bold text-dark-green border-b-[3px] border-primary-green pb-2 mb-0"
        >
          <template v-if="locale === 'de'">Datenschutz</template>
          <template v-else>Privacy Policy</template>
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
        <div class="prose prose-blue max-w-none text-gray-700">
          <h3 class="text-xl font-bold text-gray-900 mt-4 mb-4">1. Allgemeine Hinweise</h3>
          <p>
            Wir freuen uns über dein Interesse an <strong>PrepYourMeal</strong>. Der Schutz deiner
            persönlichen Daten ist uns ein sehr wichtiges Anliegen. Die folgenden Hinweise geben
            einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn
            du diese Website besuchst.
          </p>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">2. Hosting</h3>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br /><br />
            <strong>Strato</strong><br />
            Anbieter ist die STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend
            „Strato“).
          </p>
          <p>
            Wenn du unsere Website besuchst, erfasst Strato verschiedene Logfiles inklusive deiner
            IP-Adressen. Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung
            unserer Website. Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit Strato
            geschlossen.
          </p>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
            3. Registrierung und Login (Nutzerkonto)
          </h3>
          <p>
            Du hast die Möglichkeit, dich in unserer App zu registrieren. Die dazu eingegebenen
            Daten (E-Mail-Adresse und Passwort in verschlüsselter Form) verwenden wir ausschließlich
            zum Zwecke der Bereitstellung deines Nutzerkontos und der Speicherung deiner
            persönlichen Rezept-Daten. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art.
            6 Abs. 1 lit. b DSGVO.
          </p>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- ENGLISH VERSION                            -->
      <!-- ========================================== -->
      <div v-else>
        <div class="prose prose-blue max-w-none text-gray-700">
          <h3 class="text-xl font-bold text-gray-900 mt-4 mb-4">1. General Information</h3>
          <p>
            Thank you for your interest in <strong>PrepYourMeal</strong>. The protection of your
            personal data is very important to us. The following notes provide a simple overview of
            what happens to your personal data when you visit this website.
          </p>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">2. Hosting</h3>
          <p>
            We host the content of our website with the following provider:<br /><br />
            <strong>Strato</strong><br />
            The provider is STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin, Germany (hereinafter
            referred to as "Strato").
          </p>
          <p>
            When you visit our website, Strato collects various log files including your IP address.
            The use of Strato is based on Art. 6(1)(f) GDPR. We have a legitimate interest in the
            most reliable presentation of our website. We have concluded a Data Processing Agreement
            (DPA) with Strato.
          </p>

          <h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">
            3. Registration and Login (User Account)
          </h3>
          <p>
            You have the option to register in our app. We use the data entered for this purpose
            (e-mail address and password in encrypted form) exclusively for the purpose of providing
            your user account and storing your personal recipe data. The processing of this data is
            based on Art. 6(1)(b) GDPR.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { locale } = useI18n()

const updateTitle = () => {
  document.title =
    locale.value === 'de' ? 'Datenschutz | PrepMyMeal' : 'Privacy Policy | PrepMyMeal'
}

onMounted(() => {
  updateTitle()
})

watch(locale, () => {
  updateTitle()
})
</script>
