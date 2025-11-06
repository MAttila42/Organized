import { t } from '$lib/i18n.svelte'
import { createModuleRouteShortcut, registerModule } from '../utils'
import { shopping } from './store.svelte'

export function load() {
  registerModule({
    id: 'shopping',
    name: t('modules.shopping.name', 'Shopping'),
    description: t('modules.shopping.description', 'Barebones shopping module.'),
    links: [
      {
        id: 'add-item',
        name: t('modules.shopping.links.addItem.name', 'Add Item'),
        description: t('modules.shopping.links.addItem.description', 'Jump to the shopping module and open the add item dialog.'),
        moduleId: 'shopping',
        type: 'shortcut',
        call: createModuleRouteShortcut('shopping', 'add-item'),
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
