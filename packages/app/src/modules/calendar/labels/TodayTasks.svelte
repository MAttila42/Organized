<script lang='ts'>
  import type { SelectCalendarTask } from '$lib/database/schema/calendar'
  import LabelList from '$lib/components/LabelList.svelte'
  import { t } from '$lib/i18n.svelte'
  import { calendar } from '../store.svelte'

  function todayKey(): string {
    const now = new Date()
    const year = now.getFullYear().toString().padStart(4, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const todayTasks = $derived.by<SelectCalendarTask[]>(() => {
    const key = todayKey()
    const tasks = calendar.tasksByDate[key] || []
    return tasks.filter(task => !task.completed)
  })

  function formatTime(value?: string | null) {
    if (!value)
      return ''
    return value
  }
</script>

{#if todayTasks.length === 0}
  <div class='text-muted-foreground flex flex-row items-center gap-2 text-sm'>
    <div class='i-fluent:calendar-empty-16-regular size-4'></div>
    <div>{t('modules.calendar.labels.todayTasks.empty', 'No pending tasks for today.')}</div>
  </div>
{:else}
  <LabelList>
    {#each todayTasks as task (task.id)}
      <div class='px-3 py-2'>
        <div class='flex flex-row items-center gap-2'>
          <span class='min-w-0 flex-1 truncate text-sm font-medium'>{task.title}</span>
          {#if task.time}
            <span class='text-muted-foreground rounded bg-muted px-1 py-0.5 text-[10px] tracking-tight font-mono'>
              {formatTime(task.time)}
            </span>
          {/if}
        </div>
        {#if task.description}
          <p class='text-muted-foreground text-xs'>
            {task.description}
          </p>
        {/if}
      </div>
    {/each}
  </LabelList>
{/if}
