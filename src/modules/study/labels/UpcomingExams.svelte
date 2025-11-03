<script lang='ts'>
  import { onMount } from 'svelte'
  import ExamsList from '../components/ExamsList.svelte'
  import { study } from '../store.svelte'

  const UPCOMING_WINDOW_MS = 1000 * 60 * 60 * 24 * 7

  function getExamTimestamp(value: string | null | undefined) {
    if (!value)
      return Number.POSITIVE_INFINITY
    const timestamp = new Date(value).getTime()
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp
  }

  const upcomingExams = $derived(
    (() => {
      const now = Date.now()
      const end = now + UPCOMING_WINDOW_MS
      return [...study.exams]
        .filter((exam) => {
          const timestamp = getExamTimestamp(exam.date)
          if (!Number.isFinite(timestamp))
            return false
          return timestamp >= now && timestamp <= end
        })
        .sort((a, b) => {
          const diff = getExamTimestamp(a.date) - getExamTimestamp(b.date)
          if (diff !== 0)
            return diff
          return (a.id ?? 0) - (b.id ?? 0)
        })
        .slice(0, 5)
    })(),
  )

  onMount(() => {
    study.loadExams()
  })
</script>

{#if upcomingExams.length === 0}
  <div class='flex flex-row items-center gap-2 text-sm text-muted'>
    <div class='i-fluent:calendar-ltr-16-filled size-4'></div>
    <div>No exams scheduled this week.</div>
  </div>
{:else}
  <ExamsList items={upcomingExams} variant='compact' />
{/if}
