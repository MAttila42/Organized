<script lang='ts'>
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

<svelte:boundary>
  {@render children()}

  {#snippet pending()}
    <p>Loading...</p>
  {/snippet}
</svelte:boundary>
