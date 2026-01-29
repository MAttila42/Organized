<script lang='ts'>

  const {
    repoUrl,
    currentYear,
  }: {
    repoUrl: string
    onSignInWithGitHub: () => void
    currentYear: number
  } = $props()
</script>

<footer class='border-t border-white/5 bg-slate-950 py-12 text-center'>
  <div class='container mx-auto px-4'>
    <div class='mb-8'>
      <h4 class='mb-2 text-lg text-white font-bold'>Organized</h4>
      <p class='text-sm text-slate-500'>Crafted with neon energy</p>
    </div>

    <div class='mb-8 flex justify-center gap-6'>
      <a href={repoUrl} target='_blank' rel='noreferrer' class='text-sm text-slate-400 font-medium hover:text-white'>GitHub</a>
      <a href={`${repoUrl}/issues`} target='_blank' rel='noreferrer' class='text-sm text-slate-400 font-medium hover:text-white'>Issues</a>
    </div>

    <div class='text-xs text-slate-600 tracking-widest uppercase'>
      &copy; {currentYear} Open Source. MIT License.
    </div>

  </div>
</footer>
