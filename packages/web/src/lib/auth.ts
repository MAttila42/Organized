import type { Auth } from '$lib/server/auth'
import { useAuth as useAuthCore } from '@rttnd/gau/client/svelte'

export const useAuth = () => useAuthCore<Auth>()
