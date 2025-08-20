<script lang='ts'>
  const {
    icon,
    class: className = '',
  } = $props()
</script>

<button
  aria-label='Shortcut'
  class={`shortcut size-15 rounded-2xl p-4 ${className}`}
>
  <div class={`icon size-full ${icon}`}></div>
</button>

<style>
  .shortcut {
    box-shadow:
      inset 0 0 0.1em hsl(var(--background)),
      inset 0 0 2em hsl(var(--secondary)),
      inset 0 0 4em hsl(var(--secondary)),
      inset 0 0 6em hsl(var(--secondary));
    background-color: var(--color);
  }

  .icon {
    color: var(--color);
  }
</style>
