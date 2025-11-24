<script lang='ts'>
  import { cn } from '$lib/utils'
  import { Calendar as CalendarPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CalendarPrimitive.GridRowProps = $props()
</script>

<CalendarPrimitive.GridRow
  bind:ref
  class={cn('grid w-full grid-cols-7 gap-1', className)}
  {...restProps}
/>
