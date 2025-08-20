import { moduleStore } from '$lib/stores/modules.svelte'

export function load(): void | Promise<void> {
  moduleStore.modules.push({
    id: 'grocery',
    name: 'Grocery List',
    description: 'Barebones grocery list module.',
    links: [],
  })
}
