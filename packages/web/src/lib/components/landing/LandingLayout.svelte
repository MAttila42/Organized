<script lang='ts'>
  const { children } = $props<{ children?: () => unknown }>()
</script>

<div class='relative isolate flex min-h-screen flex-col overflow-hidden bg-background text-foreground'>
  <div class='pointer-events-none absolute left-1/2 top-[-18rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(120,119,198,0.45)_0%,_transparent_65%)] blur-3xl'></div>
  <div class='pointer-events-none absolute -left-32 top-[45%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(0,255,198,0.3)_0%,_transparent_70%)] blur-3xl'></div>
  <div class='pointer-events-none absolute -right-32 bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(255,145,251,0.25)_0%,_transparent_70%)] blur-3xl'></div>
  <main class='relative flex min-h-screen flex-col'>
    {@render children?.()}
  </main>
</div>
