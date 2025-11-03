<script lang='ts'>
  import type { SelectAssignments } from '$lib/database/schema/study'
  import AssignmentItem from './AssignmentItem.svelte'

  const {
    items,
    edit,
    toggleCompletion,
  }: {
    items: SelectAssignments[]
    edit?: (assignment: SelectAssignments) => void
    toggleCompletion?: (assignment: SelectAssignments, completed: boolean) => void
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as assignment (assignment.id)}
    <AssignmentItem assignment={assignment} edit={edit} toggleCompletion={toggleCompletion} />
  {/each}
</div>
