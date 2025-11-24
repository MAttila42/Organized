<script lang='ts'>
  import type { DateValue } from '@internationalized/date'
  import { Calendar, Day } from '$lib/components/ui/calendar'
  import { parseDate } from '@internationalized/date'
  import { calendar } from '../store.svelte'

  let value = $state<DateValue | undefined>(
    calendar.selectedDate ? parseDate(calendar.selectedDate) : undefined,
  )

  $effect(() => {
    if (value)
      calendar.selectDate(value.toString())
  })

  $effect(() => {
    if (calendar.selectedDate && (!value || value.toString() !== calendar.selectedDate))
      value = parseDate(calendar.selectedDate)
  })

  function hasTasks(date: DateValue): boolean {
    const key = date.toString()
    const tasks = calendar.tasksByDate[key]
    return !!tasks && tasks.length > 0 && tasks.some(t => !t.completed)
  }

  function hasCompletedTasksOnly(date: DateValue): boolean {
    const key = date.toString()
    const tasks = calendar.tasksByDate[key]
    return !!tasks && tasks.length > 0 && tasks.every(t => t.completed)
  }
</script>

<div class='w-full'>
  <Calendar type='single' bind:value class='w-full border rounded-md shadow' preventDeselect>
    {#snippet day({ day, outsideMonth })}
      <Day />
      {#if !outsideMonth}
        {#if hasTasks(day)}
          <div class='absolute bottom-1 left-1/2 h-1.5 w-1.5 rounded-full bg-primary -translate-x-1/2'></div>
        {:else if hasCompletedTasksOnly(day)}
          <div class='bg-muted-foreground/50 absolute bottom-1 left-1/2 h-1.5 w-1.5 rounded-full -translate-x-1/2'></div>
        {/if}
      {/if}
    {/snippet}
  </Calendar>
</div>
