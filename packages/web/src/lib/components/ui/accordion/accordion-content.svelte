<script lang='ts'>
  import type { WithoutChild } from '$lib/utils'
  import { cn } from '$lib/utils'
  import { Accordion as AccordionPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props()
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot='accordion-content'
  class='overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up'
  {...restProps}
>
  <div class={cn('pb-4 pt-0', className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
