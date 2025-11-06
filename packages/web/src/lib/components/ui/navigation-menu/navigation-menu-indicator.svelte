<script lang='ts'>
  import { cn } from '$lib/utils'
  import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: NavigationMenuPrimitive.IndicatorProps = $props()
</script>

<NavigationMenuPrimitive.Indicator
  bind:ref
  data-slot='navigation-menu-indicator'
  class={cn(
    'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
    className,
  )}
  {...restProps}
>
  <div class='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md'></div>
</NavigationMenuPrimitive.Indicator>
