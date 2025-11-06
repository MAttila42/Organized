<script module lang='ts'>
  export type AssignmentVariant = 'default' | 'compact'
</script>

<script lang='ts'>
  import type { SelectAssignments } from '$lib/database/schema/study'
  import { t } from '$lib/i18n.svelte'

  const {
    assignment,
    edit,
    toggleCompletion,
    variant = 'default',
  }: {
    assignment: SelectAssignments
    edit?: (assignment: SelectAssignments) => void
    toggleCompletion?: (assignment: SelectAssignments, completed: boolean) => void
    variant?: AssignmentVariant
  } = $props()

  function formatDueDate(value: string | null | undefined) {
    if (!value)
      return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime()))
      return value
    return date.toLocaleDateString()
  }

  function handleToggle(event: MouseEvent) {
    event.stopPropagation()
    toggleCompletion?.(assignment, !assignment.completed)
  }

  const dueLabel = $derived(formatDueDate(assignment.dueDate))
  const isCompleted = $derived(Boolean(assignment.completed))
  const isCompact = $derived(variant === 'compact')
  const hasToggle = $derived(Boolean(toggleCompletion))
</script>

<div class={`flex flex-row items-start gap-3 ${isCompact ? 'px-2 py-1.5' : 'p-2'}`}>
  {#if hasToggle}
    <button
      type='button'
      class={`mt-1 flex size-4 items-center justify-center rounded-full border ${isCompleted ? 'border-primary bg-primary/10 text-primary' : 'border-muted text-muted'}`}
      onclick={handleToggle}
      aria-label={isCompleted
        ? t('study.assignments.item.markIncomplete', 'Mark assignment incomplete')
        : t('study.assignments.item.markComplete', 'Mark assignment complete')}
      aria-pressed={isCompleted}
    >
      {#if isCompleted}
        <div class='i-fluent:checkmark-12-filled size-3'></div>
      {/if}
    </button>
  {/if}
  <button
    type='button'
    class={`flex flex-1 flex-col items-start gap-1 rounded-md text-left ${isCompact ? 'hover:bg-muted/20' : 'hover:bg-muted/40'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    onclick={() => edit?.(assignment)}
  >
    <div class={`w-full flex flex-row justify-between gap-2 ${isCompact ? 'items-center' : 'items-start'}`}>
      <div class={`min-w-0 flex flex-col ${isCompact ? 'gap-0' : 'gap-0.5'}`}>
        <span class={`truncate font-medium ${isCompleted ? 'text-muted line-through' : ''} ${isCompact ? 'text-sm' : ''}`}>{assignment.title}</span>
        {#if !isCompact && assignment.subject}
          <span class='truncate text-sm text-muted'>{assignment.subject}</span>
        {/if}
      </div>
      {#if dueLabel}
        <span class={`shrink-0 rounded bg-background px-2 py-0.5 text-xs text-muted ${isCompact ? 'whitespace-nowrap' : ''}`}>{dueLabel}</span>
      {/if}
    </div>
    {#if isCompact && assignment.subject}
      <div class='truncate text-xs text-muted'>{assignment.subject}</div>
    {/if}
    {#if !isCompact && assignment.description}
      <div class='line-clamp-2 w-full text-sm text-muted'>{assignment.description}</div>
    {/if}
  </button>
</div>
