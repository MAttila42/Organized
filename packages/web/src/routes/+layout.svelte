<script lang='ts'>
  import favicon from '$lib/assets/favicon.svg'
  import LandingLayout from '$lib/components/landing/LandingLayout.svelte'
  import AuthProvider from '@rttnd/gau/client/svelte/AuthProvider.svelte'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '@fontsource/ubuntu'

  const { children } = $props()
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
</svelte:head>

<AuthProvider>
  <LandingLayout>
    {@render children()}
  </LandingLayout>
</AuthProvider>
