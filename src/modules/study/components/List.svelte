<script lang='ts'>
  import type { SelectClasses } from '$lib/database/schema/study'
  import type { ItemVariant } from './Item.svelte'
  import Item from './Item.svelte'

  const {
    items,
    variant = 'default',
  }: {
    items: SelectClasses[]
    variant?: ItemVariant
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as item (item.id)}
    <Item item={item} variant={variant} />
  {/each}
</div>
