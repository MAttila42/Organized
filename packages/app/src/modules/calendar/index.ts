import { t } from '$lib/i18n.svelte'
import { createModuleRouteShortcut, registerModule } from '../utils'
import { calendar } from './store.svelte'

export function load() {
  registerModule({
    id: 'calendar',
    name: t('modules.calendar.name', 'Calendar'),
    description: t('modules.calendar.description', 'Plan your tasks day by day.'),
    links: [
      {
        id: 'add-task',
        name: t('modules.calendar.links.addTask.name', 'Add task'),
        description: t('modules.calendar.links.addTask.description', 'Jump to the calendar module and open the add task dialog.'),
        moduleId: 'calendar',
        type: 'shortcut',
        call: createModuleRouteShortcut('calendar', 'add-task'),
        parameters: [],
      },
      {
        id: 'today-tasks',
        name: t('modules.calendar.links.todayTasks.name', 'Today'),
        description: t('modules.calendar.links.todayTasks.description', 'See today\'s tasks at a glance.'),
        moduleId: 'calendar',
        type: 'label',
        call: () => import('./labels/TodayTasks.svelte'),
        parameters: [],
      },
    ],
    component: () => import('./calendar.svelte'),
  })

  calendar.loadTasks()
}
