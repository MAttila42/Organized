<script lang='ts'>
  import { t } from '$lib/i18n.svelte'
  import { calendar } from '../store.svelte'
  import TaskItem from './TaskItem.svelte'
</script>

<div class='h-full flex flex-col gap-2'>
  {#if calendar.selectedTasks.length === 0}
    <div class='text-muted-foreground h-full flex flex-col items-center justify-center p-8 text-center'>
      <div class='i-fluent:calendar-empty-16-regular mb-2 h-8 w-8 opacity-50'></div>
      <p>{t('modules.calendar.noTasks', 'No tasks for this day')}</p>
    </div>
  {:else}
    <div class='flex flex-col gap-2 overflow-y-auto p-1 pr-2'>
      {#each calendar.selectedTasks as task (task.id)}
        <TaskItem
          {task}
          onToggle={(id, completed) => calendar.setTaskCompletion(id, completed)}
          onDelete={id => calendar.removeTask(id)}
        />
      {/each}
    </div>
  {/if}
</div>
