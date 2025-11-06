import { platform } from '@tauri-apps/plugin-os'

export const isMobile = ['android', 'ios'].includes(platform())
