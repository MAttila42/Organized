<script lang='ts'>
  import { cn } from '$lib/utils'
  import { Calendar as CalendarPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.CellProps = $props()
</script>

<CalendarPrimitive.Cell
  bind:ref
  class={cn(
    'relative min-w-0 p-0 text-center text-sm focus-within:z-20 [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md',
    className,
  )}
  {...restProps}
/>
