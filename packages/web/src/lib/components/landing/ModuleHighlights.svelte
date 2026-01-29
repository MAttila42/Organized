<script lang='ts'>
  import type { ModuleHighlight } from './landing-content'

  const { modules }: { modules: ModuleHighlight[] } = $props()
</script>

<section id='modules' class='relative z-10 px-4 pb-20 -mt-10 sm:pb-24'>
  <div class='container mx-auto max-w-6xl'>

    <div class='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      {#each modules as module}
        <div class='group relative flex flex-col justify-between overflow-hidden border border-white/10 rounded-3xl bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20 hover:bg-slate-800/80 hover:-translate-y-1'>

          <div
            class='absolute h-64 w-64 rounded-full opacity-20 blur-[80px] transition-opacity -right-20 -top-20 group-hover:opacity-30'
            style={`background: ${module.accent};`}
          ></div>

          <div>
            <div class='mb-6 flex items-center gap-4'>
              <div class='h-12 w-12 flex items-center justify-center border border-white/10 rounded-2xl bg-white/5 shadow-inner'>
                <span class={`${module.icon} h-6 w-6 text-white`}></span>
              </div>
              <h3 class='text-xl text-white font-bold'>{module.name}</h3>
            </div>

            <p class='mb-8 text-sm text-slate-400 leading-relaxed'>
              {module.description}
            </p>
          </div>

          <div class='flex flex-wrap gap-2'>
            {#each module.badges as badge}
              <span class='border border-white/5 rounded-lg bg-white/5 px-3 py-1.5 text-[10px] text-slate-300 font-bold tracking-wider uppercase transition-colors group-hover:border-white/10 group-hover:bg-white/10'>
                {badge}
              </span>
            {/each}
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
