<script lang='ts'>
  import { Button } from '$lib/components/ui/button'

  interface UserSession {
    user?: {
      name?: string | null
      email?: string | null
    } | null
  }

  const {
    repoUrl,
    session,
    onSignInWithGoogle,
    onSignOut,
  }: {
    repoUrl: string
    session?: UserSession | null
    onSignInWithGoogle: () => void
    onSignOut: () => void
  } = $props()

  const displayName = session?.user?.name ?? session?.user?.email
</script>

<header class='px-5 pt-8 sm:px-6 md:px-12'>
  <div class='mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-background/70 px-4 py-4 backdrop-blur sm:rounded-full sm:px-6'>
    <a
      href='#top'
      class='flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground'
    >
      Organized
      <span class='rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[0.55rem] font-medium tracking-[0.25em] text-primary'>
        Open Source
      </span>
    </a>
    <nav class='hidden items-center gap-6 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-muted-foreground md:flex'>
      <a class='transition-colors hover:text-foreground' href='#modules'>Modules</a>
      <a class='transition-colors hover:text-foreground' href='#features'>Features</a>
      <a class='transition-colors hover:text-foreground' href='#workflow'>Workflow</a>
      <a class='transition-colors hover:text-foreground' href='#community'>Community</a>
    </nav>
    <div class='flex flex-1 items-center justify-end gap-3 md:flex-none'>
      {#if displayName}
        <span class='hidden text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground sm:inline'>
          {displayName}
        </span>
        <Button
          size='sm'
          variant='outline'
          class='hidden sm:inline-flex border-white/40 bg-background/60 shadow-[0_0_20px_rgba(120,119,198,0.15)]'
          onclick={onSignOut}
        >
          Sign out
        </Button>
      {/if}
      <Button
        size='sm'
        class='bg-primary-gradient px-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_30px_rgba(120,119,198,0.45)]'
        onclick={onSignInWithGoogle}
      >
        {displayName ? 'Switch account' : 'Join beta'}
      </Button>
      <Button
        size='sm'
        variant='ghost'
        class='hidden items-center gap-2 text-muted-foreground hover:text-foreground sm:inline-flex'
        href={repoUrl}
        target='_blank'
        rel='noreferrer'
      >
        <span class='i-lucide:github size-4'></span>
        GitHub
      </Button>
    </div>
  </div>
</header>
