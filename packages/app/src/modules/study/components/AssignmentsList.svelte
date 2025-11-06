<script lang='ts'>
  import type { SelectAssignments } from '$lib/database/schema/study'
  import type { AssignmentVariant } from './AssignmentItem.svelte'
  import AssignmentItem from './AssignmentItem.svelte'

  const {
    items,
    edit,
    toggleCompletion,
    variant = 'default',
  }: {
    items: SelectAssignments[]
    edit?: (assignment: SelectAssignments) => void
    toggleCompletion?: (assignment: SelectAssignments, completed: boolean) => void
    variant?: AssignmentVariant
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as assignment (assignment.id)}
    <AssignmentItem assignment={assignment} edit={edit} toggleCompletion={toggleCompletion} variant={variant} />
  {/each}
</div>
