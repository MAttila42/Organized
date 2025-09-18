import { moduleStore } from '$lib/stores/modules.svelte'
import { shopping } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'shopping',
    name: 'Shopping',
    description: 'Barebones shopping module.',
    links: [
      {
        id: 'test',
        name: 'Test Shortcut',
        description: 'A test shortcut link for demonstration purposes.',
        moduleId: 'shopping',
        type: 'shortcut',
        call: () => { console.log('Test shortcut activated!') },
        parameters: [],
      },
      {
        id: 'list',
        name: 'Shopping List',
        description: 'List of items to buy.',
        moduleId: 'shopping',
        type: 'label',
        call: () => import('./labels/ShoppingList.svelte'),
        parameters: [],
      },
    ],
    component: () => import('./shopping.svelte'),
  })

  shopping.loadItems()
}
