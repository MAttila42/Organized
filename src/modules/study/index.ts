import { moduleStore } from '$lib/stores/modules.svelte'
import { study } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'study',
    name: 'Study',
    description: 'Barebones study module.',
    links: [
      {
        id: 'classes-today',
        name: 'Classes today',
        description: 'List of today\'s classes.',
        moduleId: 'study',
        type: 'label',
        call: () => import('./labels/ClassesToday.svelte'),
        parameters: [],
      },
      {
        id: 'due-assignments',
        name: 'Due assignments',
        description: 'Incomplete assignments sorted by due date.',
        moduleId: 'study',
        type: 'label',
        call: () => import('./labels/DueAssignments.svelte'),
        parameters: [],
      },
    ],
    component: () => import('./study.svelte'),
  })

  study.loadItems()
}
