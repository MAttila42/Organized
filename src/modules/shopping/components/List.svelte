<script lang='ts'>
  import type { SelectShoppingList } from '$lib/database/schema/shopping'
  import type { ItemVariant } from './Item.svelte'
  import Item from './Item.svelte'

  const {
    items,
    variant = 'default',
  }: {
    items: SelectShoppingList[]
    variant?: ItemVariant
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as item (item.id)}
    <Item item={item} variant={variant} />
  {/each}
</div>
