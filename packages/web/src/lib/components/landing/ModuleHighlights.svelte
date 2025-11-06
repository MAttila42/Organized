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

<section id='modules' class='px-5 pb-16 sm:px-6 sm:pb-20 md:px-12'>
  <div class='mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
    {#each modules as module (module.name)}
      <Card class='relative overflow-hidden border-white/10 bg-background/70 backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-white/30'>
        <CardHeader class='gap-4 px-5 pt-6'>
          <div class='relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-background/60'>
            <span class='absolute inset-0 opacity-80' style={`background: ${module.accent};`}></span>
            <span class={`relative ${module.icon} size-5 text-primary`}></span>
          </div>
          <div class='space-y-2'>
            <CardTitle class='text-xl font-semibold'>{module.name}</CardTitle>
            <CardDescription class='text-sm text-muted-foreground'>
              {module.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter class='flex flex-wrap gap-2 px-5 pb-6 pt-2'>
          {#each module.badges as badge (badge)}
            <span class='rounded-full border border-white/15 bg-background/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground'>
              {badge}
            </span>
          {/each}
        </CardFooter>
        <div class='pointer-events-none absolute inset-0 -z-10 opacity-80' style={`background: ${module.accent}; filter: blur(70px);`}></div>
      </Card>
    {/each}
  </div>
</section>
