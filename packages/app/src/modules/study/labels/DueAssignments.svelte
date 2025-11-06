<script lang='ts'>
  import { t } from '$lib/i18n.svelte'
  import { onMount } from 'svelte'
  import AssignmentsList from '../components/AssignmentsList.svelte'
  import { study } from '../store.svelte'

  function getDueTimestamp(value: string | null | undefined) {
    if (!value)
      return Number.POSITIVE_INFINITY
    const timestamp = new Date(value).getTime()
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp
  }

  const dueAssignments = $derived(
    [...study.assignments]
      .filter(assignment => !assignment.completed)
      .sort((a, b) => {
        const diff = getDueTimestamp(a.dueDate) - getDueTimestamp(b.dueDate)
        if (diff !== 0)
          return diff
        return (a.id ?? 0) - (b.id ?? 0)
      }),
  )

  onMount(() => {
    study.loadAssignments()
  })
</script>

{#if dueAssignments.length === 0}
  <div class='flex flex-row items-center gap-2 text-sm text-muted'>
    <div class='i-fluent:clipboard-task-list-ltr-16-filled size-4'></div>
    <div>{t('study.labels.dueAssignments.empty', 'No upcoming assignments.')}</div>
  </div>
{:else}
  <AssignmentsList items={dueAssignments} variant='compact' />
{/if}
