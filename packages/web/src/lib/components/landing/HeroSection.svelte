<script lang='ts'>
  import { Button } from '$lib/components/ui/button'

  const {
    repoUrl,
    isSignedIn,
    onSignInWithGoogle,
  }: {
    repoUrl: string
    // We define these in the type so TypeScript knows they exist,
    // even if we don't destructure them to avoid 'unused variable' warnings.
    heroHighlights?: string[]
    releaseUrl?: string
    isSignedIn: boolean
    onSignInWithGoogle: () => void
  } = $props()
</script>

<section class='relative overflow-hidden bg-slate-950 pb-24 pt-36 text-white'>
  <div class='pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] rounded-full bg-purple-600/20 blur-[120px] -translate-x-1/2'></div>

  <div class='container relative mx-auto flex flex-col items-center px-4 text-center'>

    <h1 class='mb-6 text-5xl font-bold tracking-tight md:text-8xl'>
      Organized
    </h1>

    <p class='mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed md:text-xl'>
      Build a workspace that adapts as fast as you do.
    </p>

    <div class='w-full flex flex-col justify-center gap-4 sm:flex-row'>
      {#if !isSignedIn}
        <Button
          onclick={onSignInWithGoogle}
          class='h-12 rounded-xl bg-white px-8 text-base text-slate-900 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:bg-slate-200'
        >
          Get Started
        </Button>
      {:else}
        <Button
          href='/dashboard'
          class='h-12 rounded-xl bg-purple-600 px-8 text-base text-white font-bold shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-500'
        >
          Go to Dashboard
        </Button>
      {/if}

      <Button
        href={repoUrl}
        target='_blank'
        rel='noreferrer'
        variant='outline'
        class='h-12 border-white/10 rounded-xl bg-white/5 px-8 text-base text-white font-semibold backdrop-blur transition-all hover:bg-white/10'
      >
        View on GitHub
      </Button>
    </div>

  </div>
</section>
