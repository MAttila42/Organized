import i18next from 'i18next'
import enUS from './locales/en-US.json'
import huHU from './locales/hu-HU.json'

const i18n = $state({
  locale: i18next.language,
  locales: i18next.languages,
  setLocale: (locale: string) => {
    i18next.changeLanguage(locale)
    i18n.locale = locale
    localStorage.setItem('locale', locale)
  },
  t: (key: string, defaultValue?: string, options?: Record<string, any>) => {
    return i18next.t(key, {
      ...options,
      defaultValue,
      lng: i18n.locale,
    })
  },
})

export function useI18n() {
  i18next.init({
    lng: 'en-US',
    debug: true,
    resources: {
      'en-US': { translation: enUS },
      'hu-HU': { translation: huHU },
    },
  })

  const storedLocale = localStorage.getItem('locale')
  if (storedLocale)
    i18n.setLocale(storedLocale)
  else
    localStorage.setItem('locale', i18next.language)

  i18n.locale = i18next.language
}

export default i18n
