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

<footer class='border-t border-white/10 px-5 py-8 md:px-12 sm:px-6'>
  <div class='text-muted-foreground mx-auto max-w-6xl w-full flex flex-col gap-4 text-center text-xs tracking-[0.3em] uppercase sm:flex-row sm:items-center sm:justify-between'>
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
        class='text-muted-foreground px-0 text-xs font-semibold tracking-[0.3em] uppercase hover:text-foreground'
        onclick={onSignInWithGitHub}
      >
        Sign in with GitHub
      </Button>
    </div>
  </div>
</footer>
