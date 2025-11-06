<script>
  import { useAuth } from '$lib/auth'

  const auth = useAuth()
</script>

{#if auth.session?.user}
  <p>Welcome, {auth.session.user.name}!</p>
  <button onclick={() => auth.signOut()}>Sign Out</button>
{:else}
  <button onclick={() => auth.signIn('google')}>Sign in with Google</button>  <button onclick={() => auth.signIn('github')}>Sign in with GitHub</button>
{/if}
