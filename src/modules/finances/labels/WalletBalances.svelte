<script lang='ts'>
  import { finances } from '../store.svelte'

  const summaries = $derived(finances.walletSummaries)

  function formatAmount(value: number) {
    if (!Number.isFinite(value))
      return '0.00'
    const sign = value >= 0 ? '+' : '-'
    const absolute = Math.abs(value)
    return `${sign}${absolute.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
</script>

{#if summaries.length === 0}
  <div class='flex flex-row items-center gap-2 text-sm text-muted'>
    <div class='i-fluent:wallet-16-regular size-4'></div>
    <div>No wallets tracked yet.</div>
  </div>
{:else}
  <div class='flex flex-col gap-2'>
    {#each summaries as summary (summary.wallet.id)}
      <div class='flex flex-row items-center justify-between gap-3 border border-border/60 rounded-md bg-background px-3 py-2 text-sm'>
        <div class='min-w-0 flex flex-row items-center gap-2'>
          <span class='size-2.5 shrink-0 rounded-full' style={`background: ${summary.wallet.color ?? '#64748B'}`}></span>
          <span class='truncate font-medium'>{summary.wallet.name}</span>
        </div>
        <span class={`shrink-0 font-semibold ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
          {formatAmount(summary.balance)}
        </span>
      </div>
    {/each}
  </div>
{/if}
