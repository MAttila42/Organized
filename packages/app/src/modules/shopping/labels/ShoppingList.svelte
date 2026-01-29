<script lang='ts'>
  import List from '../components/List.svelte'
  import { shopping } from '../store.svelte'

  // Show local active items in label widget
  const items = $derived(shopping.local.activeItems)
</script>

<List items={items} variant='compact' />
