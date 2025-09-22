<script lang='ts'>
  import List from '../components/List.svelte'
  import { study } from '../store.svelte'

  function getTodayIndex() {
    const d = new Date().getDay()
    return d === 0 ? 6 : d - 1
  }

  const todayIndex = $derived(getTodayIndex())
  const todayItems = $derived(
    study.items
      .filter(i => i.day == null || i.day === todayIndex)
      .sort((a, b) => (a.schedule ?? 0) - (b.schedule ?? 0))
      .slice(0, 5),
  )
</script>

{#if todayItems.length === 0}
  <div class='flex flex-row items-center gap-2 text-sm text-muted'>
    <div class='i-fluent:book-open-16-filled size-4'></div>
    <div>No classes today.</div>
  </div>
{:else}
  <List items={todayItems} variant='compact' />
{/if}
