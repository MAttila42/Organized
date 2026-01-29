<script lang='ts'>
  import type { ShoppingItem } from '../store.svelte'
  import type { ItemVariant } from './Item.svelte'
  import Item from './Item.svelte'

  const {
    items,
    variant = 'default',
  }: {
    items: ShoppingItem[]
    variant?: ItemVariant
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as item (`${item.source}:${item.id}`)}
    <Item item={item} variant={variant} />
  {/each}
</div>
