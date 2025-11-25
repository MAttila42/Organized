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

<header class='px-5 pt-8 md:px-12 sm:px-6'>
  <div class='mx-auto max-w-6xl w-full flex flex-wrap items-center justify-between gap-4 border border-white/10 rounded-2xl bg-background/70 px-4 py-4 backdrop-blur sm:rounded-full sm:px-6'>
    <a
      href='#top'
      class='text-muted-foreground flex items-center gap-3 text-xs font-semibold tracking-[0.3em] uppercase transition-colors hover:text-foreground'
    >
      Organized
      <span class='border border-primary/40 rounded-full bg-primary/10 px-2 py-0.5 text-[0.55rem] text-primary font-medium tracking-[0.25em]'>
        Open Source
      </span>
    </a>
    <nav class='text-muted-foreground hidden items-center gap-6 text-[0.7rem] font-medium tracking-[0.35em] uppercase md:flex'>
      <a class='transition-colors hover:text-foreground' href='#modules'>Modules</a>
      <a class='transition-colors hover:text-foreground' href='#features'>Features</a>
      <a class='transition-colors hover:text-foreground' href='#workflow'>Workflow</a>
      <a class='transition-colors hover:text-foreground' href='#community'>Community</a>
    </nav>
    <div class='flex flex-1 items-center justify-end gap-3 md:flex-none'>
      {#if displayName}
        <span class='text-muted-foreground hidden text-[0.7rem] tracking-[0.3em] uppercase sm:inline'>
          {displayName}
        </span>
        <Button
          size='sm'
          variant='outline'
          class='hidden border-white/40 bg-background/60 shadow-[0_0_20px_rgba(120,119,198,0.15)] sm:inline-flex'
          onclick={onSignOut}
        >
          Sign out
        </Button>
      {/if}
      <Button
        size='sm'
        class='bg-primary-gradient px-5 text-sm text-primary-foreground font-semibold tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(120,119,198,0.45)]'
        onclick={onSignInWithGoogle}
      >
        {displayName ? 'Switch account' : 'Join beta'}
      </Button>
      <Button
        size='sm'
        variant='ghost'
        class='text-muted-foreground hidden items-center gap-2 sm:inline-flex hover:text-foreground'
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
