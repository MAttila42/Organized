<script lang='ts'>
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '@fontsource/ubuntu'
  import '@unocss/runtime'

  const { children } = $props()
</script>

<svelte:boundary>
  {@render children()}

  {#snippet pending()}
    <p>Loading...</p>
  {/snippet}
</svelte:boundary>
