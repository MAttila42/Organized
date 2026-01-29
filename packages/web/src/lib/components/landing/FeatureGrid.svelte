<script lang='ts'>
  import type { FeatureHighlight } from './landing-content'

  const { features }: { features: FeatureHighlight[] } = $props()
</script>

<section id='features' class='relative bg-slate-950 py-24 text-white'>
  <div class='container mx-auto max-w-6xl px-4'>
    <div class='mb-16 flex flex-col items-center text-center'>
      <span class='mb-4 text-xs text-purple-400 font-bold tracking-[0.3em] uppercase'>
        Capabilities
      </span>
      <h2 class='mb-6 text-3xl font-bold tracking-tight md:text-5xl'>
        Everything you need in
        <span class='from-purple-400 to-pink-500 bg-gradient-to-r bg-clip-text text-transparent'>One Place</span>
      </h2>
      <p class='max-w-2xl text-lg text-slate-400'>
        Organized keeps every workflow within reach. Modular, visual, and designed to evolve alongside your goals.
      </p>
    </div>

    <div class='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {#each features as feature}
        <div class='group relative flex flex-col overflow-hidden border border-white/10 rounded-3xl bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1'>

          <div
            class='absolute h-32 w-32 rounded-full bg-purple-500/20 blur-3xl transition-opacity duration-500 -right-10 -top-10 group-hover:bg-purple-500/30'
            style={`background: ${feature.accent}; filter: blur(60px); opacity: 0.15;`}
          ></div>

          <div class='mb-6 h-14 w-14 flex items-center justify-center border border-white/10 rounded-2xl bg-white/5 shadow-inner'>
            <span class={`${feature.icon} h-6 w-6 text-white`}></span>
          </div>

          <h3 class='mb-3 text-xl text-white font-bold'>
            {feature.title}
          </h3>
          <p class='mb-6 text-sm text-slate-400 leading-relaxed'>
            {feature.description}
          </p>

          <ul class='mt-auto space-y-3'>
            {#each feature.points as point}
              <li class='flex items-start gap-3 text-sm text-slate-300'>
                <span class='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400'></span>
                <span class='opacity-80'>{point}</span>
              </li>
            {/each}
          </ul>

        </div>
      {/each}
    </div>

  </div>
</section>
