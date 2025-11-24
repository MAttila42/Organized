<script lang='ts'>
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { Textarea } from '$lib/components/ui/textarea'
  import { t } from '$lib/i18n.svelte'
  import { calendar } from '../store.svelte'

  let open = $state(false)
  let title = $state('')
  let time = $state('')
  let description = $state('')

  function handleSubmit() {
    if (!title)
      return
    calendar.addTask({
      title,
      time: time || null,
      description: description || null,
      date: calendar.selectedDate,
      completed: 0,
    })
    open = false
    title = ''
    time = ''
    description = ''
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger class='w-full'>
    <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted transition-colors hover:bg-accent/50'>
      <div class='i-fluent:add-12-filled size-5'></div>
      <div>{t('modules.calendar.addTask', 'Add Task')}</div>
    </div>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{t('modules.calendar.addTask', 'Add Task')}</Dialog.Title>
      <Dialog.Description>
        {t('modules.calendar.addTaskDescription', 'Add a new task for {date}', { date: calendar.selectedDate })}
      </Dialog.Description>
    </Dialog.Header>
    <div class='grid gap-4 py-4'>
      <div class='grid gap-2'>
        <Label for='title'>{t('common.title', 'Title')}</Label>
        <Input id='title' bind:value={title} placeholder={t('modules.calendar.taskTitlePlaceholder', 'Buy groceries')} onkeydown={e => e.key === 'Enter' && handleSubmit()} />
      </div>
      <div class='grid gap-2'>
        <Label for='time'>{t('common.time', 'Time')}</Label>
        <Input id='time' type='time' bind:value={time} />
      </div>
      <div class='grid gap-2'>
        <Label for='description'>{t('common.description', 'Description')}</Label>
        <Textarea id='description' bind:value={description} placeholder={t('modules.calendar.taskDescriptionPlaceholder', 'Milk, Bread, Eggs...')} />
      </div>
    </div>
    <Dialog.Footer>
      <Button onclick={handleSubmit}>{t('common.save', 'Save')}</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
