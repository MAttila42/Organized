<script lang='ts'>
  import { onMount } from 'svelte'
  import ItemsView from './components/ItemsView.svelte'
  import ListSelector from './components/ListSelector.svelte'
  import { shopping } from './store.svelte'

  onMount(() => {
    void shopping.initialize()
  })
</script>

<div class='mx-4 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,320px)_1fr] xl:items-start'>
  <ListSelector />
  <ItemsView />
</div>
