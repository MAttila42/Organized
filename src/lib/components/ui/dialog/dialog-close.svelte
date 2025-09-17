<script lang='ts'>
  import { Dialog as DialogPrimitive } from 'bits-ui'

  let {
    ref = $bindable(null),
    disabled = false,
    ...restProps
  }: DialogPrimitive.CloseProps = $props()
</script>

{#if disabled}
  <div
    bind:this={ref}
    data-slot='dialog-close'
    class={`pointer-events-none select-none opacity-50 ${restProps?.class ?? ''}`}
  >
    {@render restProps?.children?.()}
  </div>
{:else}
  <DialogPrimitive.Close
    bind:ref
    data-slot='dialog-close'
    {...restProps}
  />
{/if}
