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
  </svelte:boundary>
</div>
