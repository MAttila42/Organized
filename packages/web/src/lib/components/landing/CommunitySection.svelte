<script lang='ts'>
  import type { CommunityHighlight } from './landing-content'
  import { Button } from '$lib/components/ui/button'

  const {
    repoUrl,
    highlights,
    onSignInWithGitHub,
  } = $props<{
    repoUrl: string
    highlights: CommunityHighlight[]
    onSignInWithGitHub: () => void
  }>()
</script>

<section id='community' class='px-5 pb-20 md:px-12 sm:px-6 sm:pb-24'>
  <div class='mx-auto max-w-6xl flex flex-col gap-12'>
    <div class='mx-auto max-w-3xl text-center space-y-4'>
      <span class='text-[0.7rem] text-primary font-semibold tracking-[0.35em] uppercase'>
        Community
      </span>
      <h2 class='text-3xl font-semibold sm:text-4xl'>
        Built in public with everyone invited.
      </h2>
      <p class='text-muted-foreground text-base sm:text-lg'>
        Organized is proudly open source. From roadmap discussions to brand-new modules, everything happens in the open so you can learn, build, and share together.
      </p>
    </div>
    <div class='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {#each highlights as community (community.title)}
        <div class='border border-white/10 rounded-3xl bg-background/70 p-6 text-left backdrop-blur transition-transform duration-200 hover:border-white/30 hover:-translate-y-1'>
          <div class='mb-4 size-12 flex items-center justify-center border border-white/20 rounded-full bg-background/70'>
            <span class={`${community.icon} size-5 text-primary`}></span>
          </div>
          <h3 class='text-lg font-semibold'>{community.title}</h3>
          <p class='text-muted-foreground mt-3 text-sm leading-relaxed'>
            {community.description}
          </p>
        </div>
      {/each}
    </div>
    <div class='mx-auto max-w-2xl w-full flex flex-col gap-3 sm:flex-row sm:justify-center'>
      <Button
        variant='outline'
        class='w-full border-white/40 bg-background/70 px-8 py-3 text-sm font-semibold tracking-[0.3em] uppercase sm:w-auto'
        href={`${repoUrl}/issues`}
        target='_blank'
        rel='noreferrer'
      >
        Browse issues
      </Button>
      <Button
        class='bg-primary-gradient w-full px-8 py-3 text-sm text-primary-foreground font-semibold tracking-[0.3em] uppercase shadow-[0_10px_40px_rgba(120,119,198,0.45)] sm:w-auto'
        href={`${repoUrl}#readme`}
        target='_blank'
        rel='noreferrer'
      >
        Start contributing
      </Button>
      <Button
        variant='link'
        size='sm'
        class='text-muted-foreground mx-auto px-0 text-xs font-semibold tracking-[0.3em] uppercase sm:mx-0 sm:w-auto hover:text-foreground'
        onclick={onSignInWithGitHub}
      >
        Sign in with GitHub
      </Button>
    </div>
  </div>
</section>
