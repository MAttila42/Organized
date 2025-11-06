<script lang='ts'>
  import AssignmentsCard from './components/AssignmentsCard.svelte'
  import ClassesCard from './components/ClassesCard.svelte'
  import ExamsCard from './components/ExamsCard.svelte'
</script>

<div class='mx-4 flex flex-col gap-4'>
  <ClassesCard />
  <AssignmentsCard />
  <ExamsCard />
</div>
