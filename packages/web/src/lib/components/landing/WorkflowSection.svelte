<script lang='ts'>
  import type { WorkflowStep } from './landing-content'

  const { steps }: { steps: WorkflowStep[] } = $props()
</script>

<section id='workflow' class='relative overflow-hidden bg-slate-950 py-24 text-white'>
  <div class='container mx-auto max-w-6xl px-4'>

    <div class='mb-20 text-center'>
      <span class='mb-4 block text-xs text-purple-400 font-bold tracking-[0.3em] uppercase'>
        Workflow
      </span>
      <h2 class='mb-6 text-3xl font-bold tracking-tight md:text-5xl'>
        From Idea to
        <span class='from-purple-400 to-pink-500 bg-gradient-to-r bg-clip-text text-transparent'>Execution</span>
      </h2>
      <p class='mx-auto max-w-2xl text-lg text-slate-400'>
        Organized guides you through a clear visual path. No messy spreadsheets, just a flow that knows what to do next.
      </p>
    </div>

    <div class='flex flex-col gap-24'>
      {#each steps as step, index}
        <div class={`flex flex-col items-center gap-12 md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

          <div class='flex-1 text-center space-y-6 md:text-left'>
            <div class='h-12 w-12 inline-flex items-center justify-center border border-purple-500/30 rounded-full bg-purple-500/10 text-xl text-purple-400 font-bold'>
              {index + 1}
            </div>
            <h3 class='text-3xl text-white font-bold'>
              {step.title}
            </h3>
            <p class='text-lg text-slate-400 leading-relaxed'>
              {step.description}
            </p>
          </div>

          <div class='relative flex-1'>
            <div class='absolute inset-0 translate-x-4 translate-y-4 rounded-3xl from-purple-600/20 to-blue-600/20 bg-gradient-to-br blur-2xl'></div>

            <div class='relative overflow-hidden border border-white/10 rounded-3xl bg-slate-900/80 p-8 backdrop-blur-xl transition-transform hover:scale-[1.02]'>
              <div class='mb-8 flex items-center gap-2 border-b border-white/5 pb-4'>
                <div class='h-3 w-3 rounded-full bg-red-500/50'></div>
                <div class='h-3 w-3 rounded-full bg-yellow-500/50'></div>
                <div class='h-3 w-3 rounded-full bg-green-500/50'></div>
              </div>

              <div class='flex flex-col items-center justify-center py-10'>
                <div class='mb-6 h-20 w-20 flex items-center justify-center rounded-2xl from-white/10 to-white/5 bg-gradient-to-br shadow-inner'>
                  <span class={`${step.icon} h-10 w-10 text-white`}></span>
                </div>
                <div class='h-4 w-32 rounded-full bg-white/10'></div>
                <div class='mt-3 h-3 w-24 rounded-full bg-white/5'></div>
              </div>

              <div class='mt-6 opacity-30 space-y-2'>
                <div class='h-2 w-full rounded-full bg-white/10'></div>
                <div class='h-2 w-2/3 rounded-full bg-white/10'></div>
              </div>
            </div>
          </div>

        </div>
      {/each}
    </div>

    <div class='mt-32 border border-white/10 rounded-3xl bg-white/5 p-8 backdrop-blur md:p-12'>
      <div class='flex flex-col gap-10 lg:flex-row lg:items-center'>
        <div class='flex-1 space-y-6'>
          <h3 class='text-2xl text-white font-bold md:text-3xl'>
            Automation without the code
          </h3>
          <p class='text-slate-400'>
            Stack conditions to build anything from gentle nudges to complex scenarios.
            Preview every automation in real time before publishing.
          </p>
          <div class='flex flex-col gap-3'>
            <div class='flex items-center gap-3 text-sm text-slate-300'>
              <span class='h-6 w-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-400'>✓</span>
              <span>Trigger from tasks or calendar</span>
            </div>
            <div class='flex items-center gap-3 text-sm text-slate-300'>
              <span class='h-6 w-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-400'>✓</span>
              <span>Visual logic builder</span>
            </div>
          </div>
        </div>

        <div class='flex-1 border border-white/10 rounded-xl bg-slate-900/50 p-6'>
          <div class='mb-4 flex items-center justify-between text-xs text-slate-500 font-bold tracking-widest uppercase'>
            <span>Activity Log</span>
            <span class='text-green-400'>● Live</span>
          </div>
          <div class='space-y-3'>
            <div class='flex items-center justify-between border border-white/5 rounded-lg bg-white/5 px-4 py-3'>
              <div class='flex items-center gap-3'>
                <span class='i-lucide:check-circle h-4 w-4 text-green-400'></span>
                <span class='text-sm text-slate-200'>Daily finance digest sent</span>
              </div>
              <span class='text-xs text-slate-500'>Just now</span>
            </div>
            <div class='flex items-center justify-between border border-white/5 rounded-lg bg-white/5 px-4 py-3 opacity-50'>
              <div class='flex items-center gap-3'>
                <span class='i-lucide:clock h-4 w-4 text-yellow-400'></span>
                <span class='text-sm text-slate-200'>Grocery restock pending</span>
              </div>
              <span class='text-xs text-slate-500'>2m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
