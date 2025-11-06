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

<section id='community' class='px-5 pb-20 sm:px-6 sm:pb-24 md:px-12'>
  <div class='mx-auto flex max-w-6xl flex-col gap-12'>
    <div class='mx-auto max-w-3xl space-y-4 text-center'>
      <span class='text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary'>
        Community
      </span>
      <h2 class='text-3xl font-semibold sm:text-4xl'>
        Built in public with everyone invited.
      </h2>
      <p class='text-base text-muted-foreground sm:text-lg'>
        Organized is proudly open source. From roadmap discussions to brand-new modules, everything happens in the open so you can learn, build, and share together.
      </p>
    </div>
    <div class='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {#each highlights as community (community.title)}
        <div class='rounded-3xl border border-white/10 bg-background/70 p-6 text-left backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:border-white/30'>
          <div class='mb-4 flex size-12 items-center justify-center rounded-full border border-white/20 bg-background/70'>
            <span class={`${community.icon} size-5 text-primary`}></span>
          </div>
          <h3 class='text-lg font-semibold'>{community.title}</h3>
          <p class='mt-3 text-sm leading-relaxed text-muted-foreground'>
            {community.description}
          </p>
        </div>
      {/each}
    </div>
    <div class='mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center'>
      <Button
        variant='outline'
        class='w-full border-white/40 bg-background/70 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] sm:w-auto'
        href={`${repoUrl}/issues`}
        target='_blank'
        rel='noreferrer'
      >
        Browse issues
      </Button>
      <Button
        class='bg-primary-gradient w-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-[0_10px_40px_rgba(120,119,198,0.45)] sm:w-auto'
        href={`${repoUrl}#readme`}
        target='_blank'
        rel='noreferrer'
      >
        Start contributing
      </Button>
      <Button
        variant='link'
        size='sm'
        class='mx-auto px-0 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground sm:mx-0 sm:w-auto'
        onclick={onSignInWithGitHub}
      >
        Sign in with GitHub
      </Button>
    </div>
  </div>
</section>
