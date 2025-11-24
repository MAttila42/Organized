<script lang='ts'>
  import type { FeatureHighlight } from './landing-content'
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'

  const { features } = $props<{ features: FeatureHighlight[] }>()
</script>

<section id='features' class='px-5 py-16 md:px-12 sm:px-6 sm:py-20'>
  <div class='mx-auto max-w-6xl flex flex-col gap-10'>
    <div class='mx-auto max-w-3xl text-center space-y-4'>
      <span class='text-[0.7rem] text-primary font-semibold tracking-[0.35em] uppercase'>
        Features
      </span>
      <h2 class='text-3xl font-semibold leading-tight sm:text-4xl'>
        Everything you need to run your life from a single board.
      </h2>
      <p class='text-muted-foreground text-base sm:text-lg'>
        Organized keeps every workflow within reach with a modular toolkit that evolves right alongside your goals.
      </p>
    </div>
    <div class='grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2'>
      {#each features as feature (feature.title)}
        <Card class='relative h-full overflow-hidden border-white/10 bg-background/70 backdrop-blur transition-transform duration-200 hover:border-white/30 hover:-translate-y-1'>
          <CardHeader class='gap-4 px-5 pt-6'>
            <div class='relative size-12 flex items-center justify-center overflow-hidden border border-white/20 rounded-full bg-background/60'>
              <span class='absolute inset-0 opacity-80' style={`background: ${feature.accent};`}></span>
              <span class={`relative ${feature.icon} size-5 text-primary`}></span>
            </div>
            <div class='space-y-2'>
              <CardTitle class='text-xl font-semibold'>{feature.title}</CardTitle>
              <CardDescription class='text-muted-foreground text-sm'>
                {feature.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent class='flex flex-col gap-3 px-5 pb-6'>
            {#each feature.points as point (point)}
              <div class='text-muted-foreground flex items-start gap-3 text-sm'>
                <span class='mt-1 size-2 rounded-full bg-primary/70'></span>
                <p class='leading-relaxed'>{point}</p>
              </div>
            {/each}
          </CardContent>
          <div class='pointer-events-none absolute inset-0 opacity-60 -z-10' style={`background: ${feature.accent}; filter: blur(90px);`}></div>
        </Card>
      {/each}
    </div>
  </div>
</section>
