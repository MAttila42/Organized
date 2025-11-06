<script lang='ts'>
  import { Button } from '$lib/components/ui/button'

  const {
    repoUrl,
    onSignInWithGitHub,
    currentYear,
  } = $props<{
    repoUrl: string
    onSignInWithGitHub: () => void
    currentYear: number
  }>()
</script>

<footer class='border-t border-white/10 px-5 py-8 sm:px-6 md:px-12'>
  <div class='mx-auto flex w-full max-w-6xl flex-col gap-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
    <span>© {currentYear} Organized. Crafted with neon energy.</span>
    <div class='flex justify-center gap-4'>
      <a class='transition-colors hover:text-foreground' href={repoUrl} target='_blank' rel='noreferrer'>
        GitHub
      </a>
      <a
        class='transition-colors hover:text-foreground'
        href={`${repoUrl}/blob/main/README.md`}
        target='_blank'
        rel='noreferrer'
      >
        Documentation
      </a>
      <Button
        variant='link'
        size='sm'
        class='px-0 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground'
        onclick={onSignInWithGitHub}
      >
        Sign in with GitHub
      </Button>
    </div>
  </div>
</footer>
