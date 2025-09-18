<script lang='ts'>
  import List from '../components/List.svelte'
  import { shopping } from '../store.svelte'
</script>

<List items={shopping.items} variant='compact' />
