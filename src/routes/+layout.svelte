<script lang='ts'>
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '@fontsource/ubuntu'

  const { children } = $props()
</script>

{@render children()}
