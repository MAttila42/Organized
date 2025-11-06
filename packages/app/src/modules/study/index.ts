import { t } from '$lib/i18n.svelte'
import { createModuleRouteShortcut, registerModule } from '../utils'
import { study } from './store.svelte'

export function load() {
  registerModule({
    id: 'study',
    name: t('modules.study.name', 'Study'),
    description: t('modules.study.description', 'Barebones study module.'),
    links: [
      {
        id: 'add-assignment',
        name: t('modules.study.links.addAssignment.name', 'Add assignment'),
        description: t('modules.study.links.addAssignment.description', 'Jump to the study module and open the add assignment dialog.'),
        moduleId: 'study',
        type: 'shortcut',
        call: createModuleRouteShortcut('study', 'add-assignment'),
        parameters: [],
      },
      {
        id: 'add-exam',
        name: t('modules.study.links.addExam.name', 'Add exam'),
        description: t('modules.study.links.addExam.description', 'Jump to the study module and open the add exam dialog.'),
        moduleId: 'study',
        type: 'shortcut',
        call: createModuleRouteShortcut('study', 'add-exam'),
        parameters: [],
      },
      {
        id: 'classes-today',
        name: t('modules.study.links.classesToday.name', 'Classes today'),
        description: t('modules.study.links.classesToday.description', 'List of today\'s classes.'),
        moduleId: 'study',
        type: 'label',
        call: () => import('./labels/ClassesToday.svelte'),
        parameters: [],
      },
      {
        id: 'due-assignments',
        name: t('modules.study.links.dueAssignments.name', 'Due assignments'),
        description: t('modules.study.links.dueAssignments.description', 'Incomplete assignments sorted by due date.'),
        moduleId: 'study',
        type: 'label',
        call: () => import('./labels/DueAssignments.svelte'),
        parameters: [],
      },
      {
        id: 'upcoming-exams',
        name: t('modules.study.links.upcomingExams.name', 'Upcoming exams'),
        description: t('modules.study.links.upcomingExams.description', 'Exams scheduled in the next week.'),
        moduleId: 'study',
        type: 'label',
        call: () => import('./labels/UpcomingExams.svelte'),
        parameters: [],
      },
    ],
    component: () => import('./study.svelte'),
  })

  study.loadItems()
}
