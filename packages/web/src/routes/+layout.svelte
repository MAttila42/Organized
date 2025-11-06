<script lang='ts'>
  import favicon from '$lib/assets/favicon.svg'
  import AuthProvider from '@rttnd/gau/client/svelte/AuthProvider.svelte'

  const { children } = $props()
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
</svelte:head>

<AuthProvider>
  {@render children()}
</AuthProvider>
