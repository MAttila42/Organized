<script lang='ts'>
  import type { WorkflowStep } from './landing-content'

  const { steps } = $props<{ steps: WorkflowStep[] }>()
</script>

<section id='workflow' class='px-5 pb-16 md:px-12 sm:px-6 sm:pb-20'>
  <div class='mx-auto max-w-6xl flex flex-col gap-12 lg:flex-row'>
    <div class='flex-1 space-y-6'>
      <div class='space-y-3'>
        <span class='text-[0.7rem] text-primary font-semibold tracking-[0.35em] uppercase'>
          How it works
        </span>
        <h2 class='text-3xl font-semibold sm:text-4xl'>
          Build an ecosystem that knows what to do next.
        </h2>
        <p class='text-muted-foreground text-base sm:text-lg'>
          Organized guides you from idea to execution with a clear, visual workflow that keeps every module talking to each other.
        </p>
      </div>
      <div class='grid grid-cols-1 gap-4'>
        {#each steps as step, index (step.title)}
          <div class='flex items-start gap-4 border border-white/10 rounded-2xl bg-background/70 p-5 backdrop-blur transition-transform duration-200 hover:border-white/30 hover:-translate-y-0.5'>
            <div class='size-11 flex items-center justify-center border border-white/20 rounded-full bg-background/80 text-sm text-primary font-semibold'>
              {index + 1}
            </div>
            <div class='space-y-2'>
              <div class='flex items-center gap-2'>
                <span class={`${step.icon} size-4 text-primary`}></span>
                <h3 class='text-lg font-semibold'>{step.title}</h3>
              </div>
              <p class='text-muted-foreground text-sm leading-relaxed'>{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <aside class='max-w-xl w-full border border-white/10 rounded-3xl bg-background/60 p-6 backdrop-blur lg:sticky lg:top-28 space-y-6'>
      <h3 class='text-xl font-semibold'>A flow built for living</h3>
      <p class='text-muted-foreground text-sm leading-relaxed'>
        Organize modules on a neon-lit canvas, connect them with visual rules, and preview the outcome before committing. It is everything you need to orchestrate chores, side projects, and ambitious goals without losing momentum.
      </p>
      <div class='border border-white/10 rounded-2xl bg-background/80 p-4 shadow-[0_0_40px_rgba(120,119,198,0.25)] space-y-4'>
        <div class='text-muted-foreground flex items-center justify-between text-xs font-semibold tracking-[0.3em] uppercase'>
          <span>Automation preview</span>
          <span>Live</span>
        </div>
        <div class='space-y-3'>
          <div class='flex items-center justify-between border border-white/10 rounded-lg bg-background/90 px-4 py-3 text-sm'>
            <div class='flex items-center gap-2'>
              <span class='i-lucide:calendar-clock size-4 text-primary'></span>
              <span>Daily finance digest</span>
            </div>
            <span class='text-xs text-primary tracking-[0.3em] uppercase'>Ready</span>
          </div>
          <div class='flex items-center justify-between border border-white/10 rounded-lg bg-background/90 px-4 py-3 text-sm'>
            <div class='flex items-center gap-2'>
              <span class='i-lucide:list-checks size-4 text-primary'></span>
              <span>Auto restock groceries</span>
            </div>
            <span class='text-muted-foreground text-xs tracking-[0.3em] uppercase'>Awaiting trigger</span>
          </div>
          <div class='flex items-center justify-between border border-white/10 rounded-lg bg-background/90 px-4 py-3 text-sm'>
            <div class='flex items-center gap-2'>
              <span class='i-lucide:book-open-check size-4 text-primary'></span>
              <span>Study focus block</span>
            </div>
            <span class='text-xs text-primary tracking-[0.3em] uppercase'>Queued</span>
          </div>
        </div>
      </div>
      <p class='text-muted-foreground text-xs font-semibold tracking-[0.3em] uppercase'>
        No scripts. No spreadsheets. Just your modules working together.
      </p>
    </aside>
  </div>
</section>
