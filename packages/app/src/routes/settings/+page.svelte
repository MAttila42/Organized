<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import * as Select from '$lib/components/ui/select'
  import i18n, { t } from '$lib/i18n.svelte'

  let localeSelection = $state(i18n.locale)
  const availableLocales = $derived([...i18n.locales])
  const localeOptions = $derived(
    availableLocales.map(value => ({
      value,
      label: formatLocale(value),
    })),
  )
  const selectedLocaleLabel = $derived(
    localeOptions.find(option => option.value === localeSelection)?.label ?? t('settings.language.selectPrompt', 'Select language'),
  )

  $effect(() => {
    if (!localeSelection)
      return
    if (localeSelection !== i18n.locale)
      i18n.locale = localeSelection
  })

  $effect(() => {
    const currentLocale = i18n.locale
    if (!currentLocale)
      return
    if (currentLocale !== localeSelection)
      localeSelection = currentLocale
  })

  function formatLocale(locale: string) {
    if (!locale)
      return locale

    try {
      const [languageCode, regionCode] = locale.split('-')
      const languageDisplay = new Intl.DisplayNames([i18n.locale], { type: 'language' })
      const regionDisplay = regionCode
        ? new Intl.DisplayNames([i18n.locale], { type: 'region' })
        : null

      const languageName = languageDisplay.of(languageCode ?? locale) ?? languageCode ?? locale
      const regionName = regionCode && regionDisplay ? regionDisplay.of(regionCode) ?? regionCode : null

      return regionName ? `${languageName} (${regionName})` : languageName
    }
    catch {
      return locale
    }
  }
</script>

<div class='flex flex-col gap-4 pb-6'>
  <div class='flex flex-row items-center gap-3 p-2 pt-0'>
    <a href='/' aria-label={t('back', 'Back')} draggable='false'>
      <div class='i-fluent:arrow-left-12-filled size-7'></div>
    </a>
    <h1 class='text-2xl font-bold'>{t('settings.header.title', 'Settings')}</h1>
  </div>

  <div class='mx-4 flex flex-col gap-4'>
    <SectionContainer
      title={t('settings.language.title', 'Language')}
      description={t('settings.language.description', 'Choose the language Organized uses throughout the app.')}
    >
      <div class='flex flex-col gap-2'>
        <Select.Root type='single' bind:value={localeSelection}>
          <Select.Trigger class='w-full justify-between'>
            {selectedLocaleLabel}
          </Select.Trigger>
          <Select.Content>
            {#each localeOptions as option (option.value)}
              <Select.Item value={option.value}>{option.label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>

        <p class='text-sm text-muted'>{t('settings.language.note', 'Changes apply immediately and persist across sessions.')}</p>
      </div>
    </SectionContainer>
  </div>
</div>
