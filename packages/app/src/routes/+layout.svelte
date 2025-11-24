<script lang='ts'>
  import { t } from '$lib/i18n.svelte'
  import initUnocssRuntime from '@unocss/runtime'
  import presetIcons from 'https://esm.sh/@unocss/preset-icons/browser'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '@fontsource/ubuntu'

  initUnocssRuntime({ defaults: {
    presets: [presetIcons({ cdn: 'https://esm.sh/' })],
  } })

  const { children } = $props()
</script>

<div class='pt-safe'>
  <svelte:boundary>
    {@render children()}

    {#snippet pending()}
      <p>{t('loading', 'Loading...')}</p>
    {/snippet}

    {#snippet failed(error, reset)}
      <div class='flex flex-col items-center justify-center gap-4 p-8'>
        <h1 class='text-xl font-bold'>{t('error.title', 'Something went wrong')}</h1>
        <p class='text-muted'>{(error as Error).message}</p>
        <button class='rounded-md bg-primary px-4 py-2 text-primary-foreground' onclick={reset}>
          {t('error.retry', 'Try again')}
        </button>
      </div>
    {/snippet}
  </svelte:boundary>
</div>
