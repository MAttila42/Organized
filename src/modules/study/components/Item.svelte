<script module lang='ts'>
  export type ItemVariant = 'default' | 'compact'
</script>

<script lang='ts'>
  import type { SelectClasses } from '$lib/database/schema/study'

  const {
    item,
    variant = 'default',
    edit,
  }: {
    item: SelectClasses
    variant?: ItemVariant
    edit?: (item: SelectClasses) => void
  } = $props()

  function scheduleLabel(schedule: number | null | undefined) {
    if (schedule === null || schedule === undefined)
      return ''
    return `P${schedule + 1}`
  }

  const timeLabel = $derived(scheduleLabel(item.schedule))
</script>

<button class='flex flex-col items-start gap-1 p-2' onclick={() => edit?.(item)}>
  <div class={`flex w-full flex-row gap-2 ${variant === 'compact' ? 'items-center justify-between' : 'items-start'}`}>
    <div class='min-w-0 flex flex-row items-center gap-2'>
      <div class='size-3 shrink-0 rounded-sm' style={`background:${item.color}`}></div>
      <span class='truncate font-medium'>{variant === 'compact' ? item.shortName : item.subject}</span>
      {#if item.teacher}
        <div class='truncate text-start text-sm text-muted'>{item.teacher}</div>
      {/if}
    </div>
    {#if variant === 'compact'}
      <div class='flex flex-row items-center gap-1 text-xs text-muted'>
        {#if timeLabel}<span class='rounded bg-background px-1 py-0.5'>{timeLabel}</span>{/if}
        {#if item.location}<span class='rounded bg-background px-1 py-0.5'>{item.location}</span>{/if}
      </div>
    {/if}
  </div>
  {#if variant === 'default'}
    <div class='flex flex-row items-center gap-2 text-xs text-muted'>
      {#if timeLabel}<span class='rounded bg-background px-1 py-0.5'>{timeLabel}</span>{/if}
      {#if item.location}<span class='rounded bg-background px-1 py-0.5'>{item.location}</span>{/if}
    </div>
  {/if}
</button>
