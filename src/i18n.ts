import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'

// Wir definieren Deutsch (de) als Fallback und Standardsprache
const i18n = createI18n({
  legacy: false, // Wichtig für Vue 3 Composition API
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en', // Falls ein deutscher Text fehlt, nimm englisch
  messages: {
    de,
    en,
  },
})

export default i18n
