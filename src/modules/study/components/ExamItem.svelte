<script module lang='ts'>
  export type ExamVariant = 'default' | 'compact'
</script>

<script lang='ts'>
  import type { SelectExams } from '$lib/database/schema/study'
  import { t } from '$lib/i18n.svelte'

  const {
    exam,
    edit,
    variant = 'default',
  }: {
    exam: SelectExams
    edit?: (exam: SelectExams) => void
    variant?: ExamVariant
  } = $props()

  function formatExamDate(value: string | null | undefined) {
    if (!value)
      return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime()))
      return value
    return date.toLocaleDateString()
  }

  function getExamTimestamp(value: string | null | undefined) {
    if (!value)
      return Number.POSITIVE_INFINITY
    const timestamp = new Date(value).getTime()
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp
  }

  const dateLabel = $derived(formatExamDate(exam.date))
  const isCompact = $derived(variant === 'compact')
  const isDone = $derived((() => {
    const timestamp = getExamTimestamp(exam.date)
    return Number.isFinite(timestamp) && timestamp < Date.now()
  })())
</script>

<div class={`flex flex-row items-start gap-3 ${isCompact ? 'px-2 py-1.5' : 'p-2'}`}>
  <button
    type='button'
    class={`flex flex-1 flex-col items-start gap-1 rounded-md text-left ${isCompact ? 'hover:bg-muted/20' : 'hover:bg-muted/40'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    onclick={() => edit?.(exam)}
  >
    <div class={`w-full flex flex-row justify-between gap-2 ${isCompact ? 'items-center' : 'items-start'}`}>
      <div class={`min-w-0 flex flex-col ${isCompact ? 'gap-0' : 'gap-0.5'}`}>
        <span class={`truncate font-medium ${isDone ? 'text-muted line-through' : ''} ${isCompact ? 'text-sm' : ''}`}>
          {exam.title}
        </span>
        {#if !isCompact && exam.subject}
          <span class='truncate text-sm text-muted'>{exam.subject}</span>
        {/if}
      </div>
      <div class='flex flex-col items-end gap-1'>
        {#if dateLabel}
          <span class={`shrink-0 rounded bg-background px-2 py-0.5 text-xs text-muted ${isCompact ? 'whitespace-nowrap' : ''}`}>
            {dateLabel}
          </span>
        {/if}
        {#if isDone}
          <span class='text-xs text-muted'>{t('done', 'Done')}</span>
        {/if}
      </div>
    </div>
    {#if isCompact && exam.subject}
      <div class='truncate text-xs text-muted'>{exam.subject}</div>
    {/if}
    {#if !isCompact && exam.description}
      <div class='line-clamp-2 w-full text-sm text-muted'>{exam.description}</div>
    {/if}
  </button>
</div>
