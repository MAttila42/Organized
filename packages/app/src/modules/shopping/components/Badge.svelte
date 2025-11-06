<script lang='ts'>
  import type { Snippet } from 'svelte'

  const {
    children,
  }: {
    children: Snippet<[]>
  } = $props()
</script>

<span class='border rounded-full bg-secondary px-2 text-sm'>
  {@render children()}
</span>
