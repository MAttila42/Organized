<script lang='ts'>
  import { useAuth } from '$lib/auth'
  import CommunitySection from '$lib/components/landing/CommunitySection.svelte'
  import FeatureGrid from '$lib/components/landing/FeatureGrid.svelte'
  import HeroSection from '$lib/components/landing/HeroSection.svelte'
  import {
    communityHighlights,
    features,
    heroHighlights,
    moduleHighlights,
    workflowSteps,
  } from '$lib/components/landing/landing-content'
  import LandingFooter from '$lib/components/landing/LandingFooter.svelte'
  import LandingHeader from '$lib/components/landing/LandingHeader.svelte'
  import ModuleHighlights from '$lib/components/landing/ModuleHighlights.svelte'
  import WorkflowSection from '$lib/components/landing/WorkflowSection.svelte'

  const auth = useAuth()
  const repoUrl = 'https://github.com/MAttila42/Organized'
  const releaseUrl = 'https://github.com/MAttila42/Organized/releases/latest'

  const handleGoogleSignIn = () => auth.signIn('google')
  const handleGitHubSignIn = () => auth.signIn('github')
  const handleSignOut = () => auth.signOut()

  const isSignedIn = $derived(Boolean(auth.session?.user))
  const currentYear = new Date().getFullYear()
</script>

<svelte:head>
  <title>Organized</title>
  <meta
    name='description'
    content='Organized is the open source modular workspace with neon energy. Combine shopping, finances, study and more into a single flow that runs on desktop, web, and mobile.'
  />
</svelte:head>

<div id='top' class='flex flex-1 flex-col'>
  <LandingHeader
    repoUrl={repoUrl}
    session={auth.session}
    onSignInWithGoogle={handleGoogleSignIn}
    onSignOut={handleSignOut}
  />
  <HeroSection
    heroHighlights={heroHighlights}
    repoUrl={repoUrl}
    releaseUrl={releaseUrl}
    isSignedIn={isSignedIn}
    onSignInWithGoogle={handleGoogleSignIn}
  />
  <ModuleHighlights modules={moduleHighlights} />
  <div class='mx-auto my-10 h-px w-full max-w-5xl bg-white/10'></div>
  <FeatureGrid features={features} />
  <div class='mx-auto my-10 h-px w-full max-w-5xl bg-white/10'></div>
  <WorkflowSection steps={workflowSteps} />
  <CommunitySection
    repoUrl={repoUrl}
    highlights={communityHighlights}
    onSignInWithGitHub={handleGitHubSignIn}
  />
  <LandingFooter
    repoUrl={repoUrl}
    onSignInWithGitHub={handleGitHubSignIn}
    currentYear={currentYear}
  />
</div>
