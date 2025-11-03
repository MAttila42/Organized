<script lang='ts'>
  import type { SelectAssignments } from '$lib/database/schema/study'

  const {
    assignment,
    edit,
    toggleCompletion,
  }: {
    assignment: SelectAssignments
    edit?: (assignment: SelectAssignments) => void
    toggleCompletion?: (assignment: SelectAssignments, completed: boolean) => void
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
</script>

<div class='flex flex-row items-start gap-3 p-2'>
  <button
    type='button'
    class={`mt-1 flex size-4 items-center justify-center rounded-full border ${isCompleted ? 'border-primary bg-primary/10 text-primary' : 'border-muted text-muted'}`}
    onclick={handleToggle}
    aria-label={isCompleted ? 'Mark assignment incomplete' : 'Mark assignment complete'}
    aria-pressed={isCompleted}
  >
    {#if isCompleted}
      <div class='i-fluent:checkmark-12-filled size-3'></div>
    {/if}
  </button>
  <button
    type='button'
    class='flex flex-1 flex-col items-start gap-1 rounded-md text-left hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    onclick={() => edit?.(assignment)}
  >
    <div class='w-full flex flex-row items-start justify-between gap-2'>
      <div class='min-w-0 flex flex-col gap-0.5'>
        <span class={`truncate font-medium ${isCompleted ? 'text-muted line-through' : ''}`}>{assignment.title}</span>
        {#if assignment.subject}
          <span class='truncate text-sm text-muted'>{assignment.subject}</span>
        {/if}
      </div>
      {#if dueLabel}
        <span class='shrink-0 rounded bg-background px-2 py-0.5 text-xs text-muted'>{dueLabel}</span>
      {/if}
    </div>
    {#if assignment.description}
      <div class='line-clamp-2 w-full text-sm text-muted'>{assignment.description}</div>
    {/if}
  </button>
</div>
