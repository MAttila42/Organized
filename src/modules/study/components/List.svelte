<script lang='ts'>
  import type { SelectClasses } from '$lib/database/schema/study'
  import type { ItemVariant } from './Item.svelte'
  import Item from './Item.svelte'

  const {
    items,
    variant = 'default',
    edit,
  }: {
    items: SelectClasses[]
    variant?: ItemVariant
    edit?: (item: SelectClasses) => void
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as item (item.id)}
    <Item item={item} variant={variant} edit={edit} />
  {/each}
</div>
