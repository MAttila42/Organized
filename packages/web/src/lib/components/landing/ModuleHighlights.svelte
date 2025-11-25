<script lang='ts'>
  import type { ModuleHighlight } from './landing-content'
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'

  const { modules } = $props<{ modules: ModuleHighlight[] }>()
</script>

<section id='modules' class='px-5 pb-16 md:px-12 sm:px-6 sm:pb-20'>
  <div class='grid grid-cols-1 mx-auto max-w-6xl gap-5 lg:grid-cols-3 sm:grid-cols-2'>
    {#each modules as module (module.name)}
      <Card class='relative overflow-hidden border-white/10 bg-background/70 backdrop-blur transition-transform duration-200 hover:border-white/30 hover:-translate-y-1'>
        <CardHeader class='gap-4 px-5 pt-6'>
          <div class='relative size-12 flex items-center justify-center overflow-hidden border border-white/20 rounded-full bg-background/60'>
            <span class='absolute inset-0 opacity-80' style={`background: ${module.accent};`}></span>
            <span class={`relative ${module.icon} size-5 text-primary`}></span>
          </div>
          <div class='space-y-2'>
            <CardTitle class='text-xl font-semibold'>{module.name}</CardTitle>
            <CardDescription class='text-muted-foreground text-sm'>
              {module.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter class='flex flex-wrap gap-2 px-5 pb-6 pt-2'>
          {#each module.badges as badge (badge)}
            <span class='text-muted-foreground border border-white/15 rounded-full bg-background/80 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.25em] uppercase'>
              {badge}
            </span>
          {/each}
        </CardFooter>
        <div class='pointer-events-none absolute inset-0 opacity-80 -z-10' style={`background: ${module.accent}; filter: blur(70px);`}></div>
      </Card>
    {/each}
  </div>
</section>
