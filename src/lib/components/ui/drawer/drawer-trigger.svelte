<script lang='ts'>
  import {
    selectionFeedback,
  } from '@tauri-apps/plugin-haptics'
  import { Drawer as DrawerPrimitive } from 'vaul-svelte'

  let { ref = $bindable(null), ...restProps }: DrawerPrimitive.TriggerProps = $props()

  let timer: ReturnType<typeof setTimeout> | null = null

  function handlePointerDown() {
    timer = setTimeout(() => {
      ref?.click?.()
      selectionFeedback()
    }, 500)
  }

  function handlePointerUp() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
</script>

<DrawerPrimitive.Trigger
  bind:ref
  data-slot='drawer-trigger'
  {...restProps}
  onpointerdown={handlePointerDown}
  onpointerup={handlePointerUp}
  onpointerleave={handlePointerUp}
/>
