<script lang='ts'>
  import type { SelectExams } from '$lib/database/schema/study'
  import type { ExamVariant } from './ExamItem.svelte'
  import ExamItem from './ExamItem.svelte'

  const {
    items,
    edit,
    variant = 'default',
  }: {
    items: SelectExams[]
    edit?: (exam: SelectExams) => void
    variant?: ExamVariant
  } = $props()
</script>

<div class='flex flex-col rounded-lg bg-background divide-y'>
  {#each items as exam (exam.id)}
    <ExamItem exam={exam} edit={edit} variant={variant} />
  {/each}
</div>
