import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome to Event Tuna',
    events: 'Events',
    addEvent: 'Add Event'
  },
  de: {
    welcome: 'Willkommen bei Event Tuna',
    events: 'Events',
    addEvent: 'Event hinzufügen'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
