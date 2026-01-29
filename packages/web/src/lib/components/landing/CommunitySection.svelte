<script lang='ts'>
  import type { CommunityHighlight } from './landing-content'
  import { Button } from '$lib/components/ui/button'

  const {
    repoUrl,
    onSignInWithGitHub,
  }: {
    repoUrl: string
    highlights: CommunityHighlight[]
    onSignInWithGitHub: () => void
  } = $props()
</script>

<section id='community' class='relative overflow-hidden bg-slate-950 py-32 text-white'>

  <div class='[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'></div>

  <div class='container relative mx-auto max-w-5xl px-4'>

    <div class='relative overflow-hidden border border-white/10 rounded-[2.5rem] bg-slate-900/50 px-6 py-20 text-center shadow-2xl backdrop-blur-xl md:px-20'>

      <div class='absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-purple-600/30 blur-[100px] -translate-x-1/2 -translate-y-1/2'></div>

      <div class='relative'>
        <span class='mb-6 inline-block border border-purple-500/30 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs text-purple-300 font-bold tracking-widest uppercase'>
          Open Source
        </span>

        <h2 class='mb-8 text-4xl font-bold tracking-tight md:text-6xl'>
          Built in public. <br />
          <span class='text-slate-400'>Powered by you.</span>
        </h2>

        <p class='mx-auto mb-10 max-w-2xl text-lg text-slate-400'>
          Organized is proudly open source. From roadmap discussions to brand-new modules,
          everything happens in the open so you can learn, build, and share together.
        </p>

        <div class='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Button
            href={repoUrl}
            target='_blank'
            rel='noreferrer'
            class='h-14 rounded-full bg-white px-10 text-lg text-slate-900 font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-200'
          >
            <span class='mr-2 text-xl'>★</span> Star on GitHub
          </Button>

          <Button
            onclick={onSignInWithGitHub}
            variant='outline'
            class='h-14 border-white/10 rounded-full bg-white/5 px-10 text-lg text-white font-bold backdrop-blur transition-all hover:bg-white/10'
          >
            Join the Community
          </Button>
        </div>

        <div class='mt-12 flex flex-wrap justify-center gap-8 border-t border-white/5 pt-8 opacity-60'>
          <div class='flex flex-col items-center'>
            <span class='text-2xl text-white font-bold'>MIT</span>
            <span class='text-xs text-slate-500 tracking-wider uppercase'>License</span>
          </div>
          <div class='flex flex-col items-center'>
            <span class='text-2xl text-white font-bold'>100%</span>
            <span class='text-xs text-slate-500 tracking-wider uppercase'>Free</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
