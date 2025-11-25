<script lang='ts'>
  const { children } = $props<{ children?: () => unknown }>()
</script>

<div class='relative isolate min-h-screen flex flex-col overflow-hidden bg-background text-foreground'>
  <div class='pointer-events-none absolute left-1/2 top-[-18rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(120,119,198,0.45)_0%,_transparent_65%)] blur-3xl -translate-x-1/2'></div>
  <div class='pointer-events-none absolute top-[45%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(0,255,198,0.3)_0%,_transparent_70%)] blur-3xl -left-32'></div>
  <div class='pointer-events-none absolute bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(255,145,251,0.25)_0%,_transparent_70%)] blur-3xl -right-32'></div>
  <main class='relative min-h-screen flex flex-col'>
    {@render children?.()}
  </main>
</div>
