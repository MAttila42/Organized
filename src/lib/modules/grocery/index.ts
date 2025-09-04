import { moduleStore } from '$lib/stores/modules.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'grocery',
    name: 'Grocery List',
    description: 'Barebones grocery list module.',
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
      {
        id: 'test2',
        name: 'Test Label',
        description: 'A test label link for demonstration purposes.',
        moduleId: 'grocery',
        type: 'label',
        call: () => {},
        parameters: [],
      },
    ],
    component: () => import('./page.svelte'),
  })
}
