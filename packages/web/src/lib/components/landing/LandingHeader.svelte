<script lang='ts'>
  import { Button } from '$lib/components/ui/button'

  // We keep your exact interface to ensure type safety
  interface UserSession {
    user?: {
      name?: string | null
      email?: string | null
    } | null
  }

  const {
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

<header class='fixed left-0 right-0 top-6 z-50 mx-auto max-w-6xl w-full px-4'>
  <div class='flex items-center justify-between border border-white/10 rounded-full bg-slate-900/60 px-6 py-3 shadow-2xl backdrop-blur-md transition-all hover:border-white/20 hover:bg-slate-900/80'>
    <a href='#top' class='flex items-center gap-3 transition-opacity hover:opacity-80'>
      <span class='text-sm text-white font-bold tracking-widest uppercase'>
        Organized
      </span>
      <span class='hidden border border-purple-500/30 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-300 font-bold tracking-wider uppercase sm:inline-block'>
        Beta
      </span>
    </a>

    <nav class='hidden items-center gap-8 md:flex'>
      <a class='text-xs text-slate-400 font-medium tracking-widest uppercase transition-colors hover:text-white' href='#modules'>Modules</a>
      <a class='text-xs text-slate-400 font-medium tracking-widest uppercase transition-colors hover:text-white' href='#features'>Features</a>
      <a class='text-xs text-slate-400 font-medium tracking-widest uppercase transition-colors hover:text-white' href='#workflow'>Workflow</a>
    </nav>

    <div class='flex items-center gap-3'>
      {#if displayName}
        <span class='hidden text-xs text-slate-400 font-medium sm:inline-block'>
          {displayName}
        </span>
        <Button
          size='sm'
          variant='ghost'
          class='h-8 border border-white/10 rounded-full px-4 text-xs text-white font-medium hover:bg-white/10'
          onclick={onSignOut}
        >
          Sign Out
        </Button>
      {:else}
        <Button
          size='sm'
          class='h-8 rounded-full bg-white px-5 text-xs text-slate-900 font-bold hover:bg-slate-200'
          onclick={onSignInWithGoogle}
        >
          Sign In
        </Button>
      {/if}

    </div>

  </div>
</header>
