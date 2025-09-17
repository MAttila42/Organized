import { moduleStore } from '$lib/stores/modules.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'shopping',
    name: 'Shopping List',
    description: 'Barebones shopping list module.',
    links: [
      {
        id: 'test',
        name: 'Test Shortcut',
        description: 'A test shortcut link for demonstration purposes.',
        moduleId: 'grocery',
        type: 'shortcut',
        call: () => {},
        parameters: [],
      },
    ],
    component: () => import('./page.svelte'),
  })
}
