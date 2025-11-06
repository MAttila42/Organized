<script lang='ts'>
  import { onMount } from 'svelte'
  import TransactionsView from './components/TransactionsView.svelte'
  import WalletSelector from './components/WalletSelector.svelte'
  import { finances } from './store.svelte'

  onMount(() => {
    void finances.loadAll()
  })
</script>

<div class='mx-4 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,320px)_1fr] xl:items-start'>
  <WalletSelector />
  <TransactionsView />
</div>
