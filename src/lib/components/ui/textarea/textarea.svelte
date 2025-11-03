<script lang='ts'>
  import type { WithElementRef } from '$lib/utils'
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils'

  type Props = WithElementRef<HTMLTextareaAttributes>

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: Props = $props()
</script>

<textarea
  bind:this={ref}
  data-slot='textarea'
  class={cn(
    'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex w-full min-h-[96px] rounded-md border px-3 py-2 text-sm outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    className,
  )}
  bind:value
  {...restProps}
></textarea>
