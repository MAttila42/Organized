<script lang='ts'>
  import type { SelectCalendarTask } from '$lib/database/schema/calendar'
  import { Button } from '$lib/components/ui/button'
  import { cn } from '$lib/utils'

  const { task, onToggle, onDelete }: {
    task: SelectCalendarTask
    onToggle: (id: number, completed: boolean) => void
    onDelete: (id: number) => void
  } = $props()
</script>

<div class='group flex items-center justify-between border rounded-lg p-3 shadow-sm transition-colors hover:bg-accent/50'>
  <div class='flex items-center gap-3 overflow-hidden'>
    <button
      class={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all', task.completed && 'bg-primary text-primary-foreground')}
      onclick={() => onToggle(task.id, !task.completed)}
    >
      {#if task.completed}
        <div class='i-fluent:checkmark-12-filled h-3.5 w-3.5'></div>
      {/if}
    </button>
    <div class='flex flex-col overflow-hidden'>
      <span class={cn('truncate font-medium leading-none transition-all', task.completed && 'text-muted-foreground line-through')}>
        {task.title}
      </span>
      {#if task.time || task.description}
        <div class='text-muted-foreground mt-1 flex gap-2 text-xs'>
          {#if task.time}
            <span class='rounded bg-muted px-1 font-mono'>{task.time}</span>
          {/if}
          {#if task.description}
            <span class='truncate'>{task.description}</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <Button variant='ghost' size='icon' class='h-8 w-8 text-destructive opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100' onclick={() => onDelete(task.id)}>
    <div class='i-fluent:delete-16-regular h-4 w-4'></div>
  </Button>
</div>
