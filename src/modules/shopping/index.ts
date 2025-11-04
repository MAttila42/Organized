import { t } from '$lib/i18n.svelte'
import { moduleStore } from '$lib/stores/modules.svelte'
import { shopping } from './store.svelte'

export function load() {
  moduleStore.modules.push({
    id: 'shopping',
    name: t('modules.shopping.name', 'Shopping'),
    description: t('modules.shopping.description', 'Barebones shopping module.'),
    links: [
      {
        id: 'test',
        name: 'Test Shortcut',
        description: 'A test shortcut link for demonstration purposes.',
        moduleId: 'shopping',
        type: 'shortcut',
        call: () => { console.warn('Test shortcut activated!') },
        parameters: [],
      },
      {
        id: 'list',
        name: t('modules.shopping.links.list.name', 'Shopping List'),
        description: t('modules.shopping.links.list.description', 'List of items to buy.'),
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
