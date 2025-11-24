import i18next from 'i18next'

const state = $state({
  locale: 'en-US',
  locales: [] as string[],
})

/**
 * Simple wrapper around i18next for Svelte.
 */
const i18n = {
  /**
   * The current locale.
   */
  get locale() {
    return state.locale
  },

  /**
   * Sets the locale and updates i18next and localStorage.
   * @param locale The locale to set.
   */
  set locale(locale: string) {
    state.locale = locale
    localStorage.setItem('locale', locale)
  },

  /**
   * The available locales.
   */
  get locales() {
    return state.locales
  },
}

/**
 * Translates a key using i18next.
 *
 * @param key The translation key to look up.
 * @param fallback An optional fallback string to return if the key is not found. (Organized convention: use the default locale's translation as fallback and use lin for translations)
 * @returns The translated string for the given key in the selected locale, or the fallback if the key is not found.
 */
export function t(key: string, fallback?: string, options?: Record<string, any>) {
  return i18next.t(key, {
    defaultValue: fallback,
    lng: state.locale,
    ...options,
  })
}

/**
 * Initializes i18next with the available locales and sets the initial locale.
 *
 * The avaliable locales are loaded from JSON files in the `$lib/locales` directory.
 *
 * The initial locale is set to the value stored in localStorage, or defaults to `en-US`.
 */
export function initI18n() {
  const resources: Record<string, any> = {}
  const localeModules = import.meta.glob('./locales/*.json', { eager: true })
  for (const path in localeModules) {
    const localeKey = path.match(/([\w-]+)\.json$/)?.[1]
    if (localeKey) {
      const module = localeModules[path]
      resources[localeKey] = { translation: (module as any).default }
      state.locales.push(localeKey)
    }
  }

  const storedLocale = localStorage.getItem('locale')
  if (storedLocale && state.locales.includes(storedLocale))
    state.locale = storedLocale

  i18next.init({
    lng: state.locale,
    debug: false,
    resources,
  })
}

export default i18n
