<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { t } from '$lib/i18n.svelte'
  import AddTaskDialog from './components/AddTaskDialog.svelte'
  import CalendarView from './components/CalendarView.svelte'
  import TaskList from './components/TaskList.svelte'
  import { calendar } from './store.svelte'

  function formatDate(dateStr: string) {
    if (!dateStr)
      return ''
    const date = new Date(`${dateStr}T00:00:00`)
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
</script>

<div class='mx-4 flex flex-col gap-4 md:flex-row'>
  <SectionContainer
    title={t('modules.calendar.calendar', 'Calendar')}
    description={t('modules.calendar.calendarDescription', 'Select a date to view tasks.')}
    class='flex justify-center'
  >
    <CalendarView />
  </SectionContainer>

  <SectionContainer
    title={formatDate(calendar.selectedDate)}
    description={t('modules.calendar.tasksDescription', 'Tasks for the selected date.')}
    class='flex flex-1 flex-col gap-4'
  >
    <div class='flex-1 overflow-hidden'>
      <TaskList />
    </div>
    <AddTaskDialog />
  </SectionContainer>
</div>
