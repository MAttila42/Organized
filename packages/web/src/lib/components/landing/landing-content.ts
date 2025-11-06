export interface ChangelogLink {
  label: string
  href: string
}

export interface ModuleHighlight {
  name: string
  description: string
  icon: string
  accent: string
  badges: string[]
}

export interface FeatureHighlight {
  title: string
  description: string
  icon: string
  accent: string
  points: string[]
}

export interface WorkflowStep {
  title: string
  description: string
  icon: string
}

export interface CommunityHighlight {
  title: string
  description: string
  icon: string
}

export const heroHighlights = [
  'Drag-and-drop modules for shopping, finances, study, and anything else you can imagine.',
  'Automate workflows that keep budgets, tasks, and notes perfectly in sync.',
  'Runs everywhere: desktop, web, and mobile with the same blazing-fast interface.',
]

export const moduleHighlights: ModuleHighlight[] = [
  {
    name: 'Shopping',
    description:
      'Plan trips with collaborative lists, live pricing, and budget protection for every store.',
    icon: 'i-lucide:shopping-cart',
    accent:
      'radial-gradient(80% 80% at 20% 0%, rgba(59, 233, 255, 0.45) 0%, rgba(59, 233, 255, 0.05) 70%, transparent 100%)',
    badges: ['Shared lists', 'Budget guardrails', 'Inventory sync'],
  },
  {
    name: 'Finances',
    description:
      'Track spending, forecast cash flow, and connect invoices or subscriptions without spreadsheets.',
    icon: 'i-lucide:piggy-bank',
    accent:
      'radial-gradient(80% 80% at 75% 10%, rgba(196, 86, 255, 0.45) 0%, rgba(196, 86, 255, 0.08) 70%, transparent 100%)',
    badges: ['Multi-account', 'Rules engine', 'Neon analytics'],
  },
  {
    name: 'Study',
    description:
      'Turn notes into spaced repetition decks, plan semesters, and stay motivated across devices.',
    icon: 'i-lucide:graduation-cap',
    accent:
      'radial-gradient(80% 80% at 50% 10%, rgba(120, 119, 198, 0.45) 0%, rgba(120, 119, 198, 0.08) 70%, transparent 100%)',
    badges: ['Adaptive schedule', 'Focus timers', 'Progress snapshots'],
  },
]

export const features: FeatureHighlight[] = [
  {
    title: 'Compose your own system',
    description: 'Mix and match modules with zero friction to build a control center around your life.',
    icon: 'i-lucide:sparkles',
    accent:
      'radial-gradient(70% 70% at 50% 5%, rgba(255, 147, 255, 0.35) 0%, transparent 70%)',
    points: [
      'Rearrange layouts instantly with drag-and-drop sections.',
      'Link data across modules without double entry or messy syncs.',
      'Start from curated templates or design from scratch in minutes.',
    ],
  },
  {
    title: 'Automation without scripts',
    description:
      'Use visual rules to automate reminders, sync data, and keep every list and ledger up to date.',
    icon: 'i-lucide:workflow',
    accent:
      'radial-gradient(70% 70% at 50% 5%, rgba(0, 255, 198, 0.35) 0%, transparent 70%)',
    points: [
      'Trigger flows from tasks, calendar events, or external webhooks.',
      'Stack conditions to build anything from gentle nudges to complex scenarios.',
      'Preview every automation in real time before publishing.',
    ],
  },
  {
    title: 'Neon-sharp interface',
    description:
      'Crafted with shadcn-svelte on a neutral canvas, highlighted by neon accents that keep focus alive.',
    icon: 'i-lucide:monitor',
    accent:
      'radial-gradient(70% 70% at 50% 5%, rgba(120, 119, 198, 0.35) 0%, transparent 70%)',
    points: [
      'Glows that highlight real priorities without overwhelming your eyes.',
      'Accessible by default with thoughtful keyboard support everywhere.',
      'Powered by UnoCSS for instant custom theming and scaling.',
    ],
  },
]

export const workflowSteps: WorkflowStep[] = [
  {
    title: 'Pick the modules you need',
    description:
      'Start with shopping, finances, study and more, or explore community-built packs.',
    icon: 'i-lucide:grid-3x3',
  },
  {
    title: 'Link everything together',
    description:
      'Connect data visually between modules so context flows wherever you need it.',
    icon: 'i-lucide:link-2',
  },
  {
    title: 'Automate your routine',
    description:
      'Schedule reminders, generate reports, and keep every collaborator in sync automatically.',
    icon: 'i-lucide:zap',
  },
  {
    title: 'Stay in flow everywhere',
    description:
      'Switch between desktop, web, and mobile apps with the same blazing-fast experience.',
    icon: 'i-lucide:smartphone',
  },
]

export const communityHighlights: CommunityHighlight[] = [
  {
    title: 'Open source core',
    description: 'MIT-licensed from day one. Fork it, remix it, or help drive the roadmap.',
    icon: 'i-lucide:git-branch',
  },
  {
    title: 'Module marketplace',
    description: 'Publish new modules, discover community packs, and extend Organized beyond the defaults.',
    icon: 'i-lucide:layers',
  },
  {
    title: 'Transparent planning',
    description: 'Follow milestones, vote on features, and ship improvements together.',
    icon: 'i-lucide:radar',
  },
]
