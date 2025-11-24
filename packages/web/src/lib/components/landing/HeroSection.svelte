<script lang='ts'>
  import { Button } from '$lib/components/ui/button'

  const {
    heroHighlights,
    repoUrl,
    releaseUrl,
    isSignedIn,
    onSignInWithGoogle,
  }: {
    heroHighlights: string[]
    repoUrl: string
    releaseUrl: string
    isSignedIn: boolean
    onSignInWithGoogle: () => void
  } = $props()
</script>

<section class='px-5 pb-16 pt-12 md:px-12 sm:px-6 md:pb-28 sm:pb-20 sm:pt-16'>
  <div class='mx-auto max-w-4xl flex flex-col items-center gap-8 text-center'>
    <span class='text-muted-foreground inline-flex items-center gap-2 border border-white/10 rounded-full bg-background/60 px-4 py-2 text-[0.65rem] font-medium tracking-[0.4em] uppercase backdrop-blur'>
      Modular productivity App
    </span>
    <div class='space-y-6'>
      <h1 class='text-4xl font-semibold leading-tight md:text-6xl sm:text-5xl'>
        Build a workspace that adapts as fast as you do.
      </h1>
      <p class='text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg'>
        Organized is the open source desk that stays in sync across every part of your life. Start with modules for shopping, finances, and study, then remix them into the exact workflow you need.
      </p>
    </div>
    <div class='w-full flex flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center'>
      <Button
        size='lg'
        class='bg-primary-gradient w-full px-8 py-4 text-base text-primary-foreground font-semibold tracking-[0.2em] uppercase shadow-[0_16px_60px_rgba(120,119,198,0.45)] sm:w-auto'
        href={isSignedIn ? releaseUrl : undefined}
        target={isSignedIn ? '_blank' : undefined}
        rel={isSignedIn ? 'noreferrer' : undefined}
        onclick={isSignedIn ? undefined : onSignInWithGoogle}
      >
        {isSignedIn ? 'Download Organized' : 'Start with Google'}
      </Button>
      <Button
        size='lg'
        variant='outline'
        class='w-full border-white/40 bg-background/60 px-8 py-4 text-base font-semibold tracking-[0.2em] uppercase backdrop-blur sm:w-auto'
        href={repoUrl}
        target='_blank'
        rel='noreferrer'
      >
        Explore on GitHub
      </Button>
    </div>
    <div class='grid grid-cols-1 max-w-3xl w-full gap-3 sm:grid-cols-3'>
      {#each heroHighlights as highlight (highlight)}
        <div class='text-muted-foreground border border-white/10 rounded-xl bg-background/60 p-4 text-left text-xs font-medium leading-relaxed tracking-[0.3em] uppercase backdrop-blur'>
          {highlight}
        </div>
      {/each}
    </div>
  </div>
</section>
