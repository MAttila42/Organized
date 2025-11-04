<script lang='ts'>
  import type { InsertAssignments, SelectAssignments } from '$lib/database/schema/study'
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { Textarea } from '$lib/components/ui/textarea'
  import { t } from '$lib/i18n.svelte'
  import { study } from '../store.svelte'
  import AssignmentsList from './AssignmentsList.svelte'

  const sortedAssignments = $derived(
    [...study.assignments].sort((a, b) => {
      const aCompleted = Boolean(a.completed)
      const bCompleted = Boolean(b.completed)
      if (aCompleted !== bCompleted)
        return aCompleted ? 1 : -1

      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY

      if (Number.isFinite(aDate) && Number.isFinite(bDate))
        return aDate - bDate
      if (Number.isFinite(aDate))
        return -1
      if (Number.isFinite(bDate))
        return 1

      return (a.id ?? 0) - (b.id ?? 0)
    }),
  )

  let title = $state('')
  let subject = $state('')
  let dueDate = $state('')
  let description = $state('')

  let editing = $state<null | number>(null)
  let isEditOpen = $state(false)
  let editTitle = $state('')
  let editSubject = $state('')
  let editDueDate = $state('')
  let editDescription = $state('')
  let editCompleted = $state(false)

  const isAddReady = $derived(!!title.trim())
  const isEditReady = $derived(!!editTitle.trim() && editing != null)

  function resetForm() {
    title = ''
    subject = ''
    dueDate = ''
    description = ''
  }

  function openEdit(item: SelectAssignments) {
    editing = item.id ?? null
    if (editing == null)
      return
    editTitle = item.title ?? ''
    editSubject = item.subject ?? ''
    editDueDate = item.dueDate ?? ''
    editDescription = item.description ?? ''
    editCompleted = Boolean(item.completed)
    isEditOpen = true
  }

  function closeEdit() {
    isEditOpen = false
    editing = null
  }

  async function addAssignment() {
    if (!isAddReady)
      return
    const payload: InsertAssignments = {
      title: title.trim(),
      subject: subject.trim() || null,
      dueDate: dueDate || null,
      description: description.trim() || null,
      completed: 0,
    }
    await study.addAssignment(payload)
    resetForm()
  }

  async function saveAssignment() {
    if (!isEditReady || editing == null)
      return
    await study.updateAssignment(editing, {
      title: editTitle.trim(),
      subject: editSubject.trim() || null,
      dueDate: editDueDate || null,
      description: editDescription.trim() || null,
      completed: editCompleted ? 1 : 0,
    })
    closeEdit()
  }

  async function deleteAssignment() {
    if (editing == null)
      return
    await study.removeAssignment(editing)
    closeEdit()
  }

  async function toggleCompletion(item: SelectAssignments, completed: boolean) {
    if (item.id == null)
      return
    await study.setAssignmentCompletion(item.id, completed)
  }
</script>

<SectionContainer
  title={t('study.assignments.title', 'Assignments')}
  description={t('study.assignments.description', 'Track tasks and upcoming deadlines.')}
  class='flex flex-col gap-3'
>
  {#if sortedAssignments.length === 0}
    <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:clipboard-task-list-ltr-16-filled size-5'></div>
      <div>{t('study.assignments.empty', 'No assignments yet. Add one.')}</div>
    </div>
  {:else}
    <AssignmentsList items={sortedAssignments} edit={openEdit} toggleCompletion={toggleCompletion} />
  {/if}

  <Dialog.Root>
    <Dialog.Trigger class='w-full'>
      <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted'>
        <div class='i-fluent:add-12-filled size-5'></div>
        <div>{t('study.assignments.add.trigger', 'Add Assignment')}</div>
      </div>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{t('study.assignments.add.title', 'Add Assignment')}</Dialog.Title>
      </Dialog.Header>

      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='title'>{t('study.assignments.add.titleLabel', 'Title')}</Label>
          <Input id='title' type='text' bind:value={title} placeholder={t('study.assignments.add.titlePlaceholder', 'Read Chapter 5')} />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='subject'>{t('study.assignments.add.subjectLabel', 'Subject')}</Label>
            <Input id='subject' type='text' bind:value={subject} placeholder={t('study.assignments.add.subjectPlaceholder', 'History')} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='dueDate'>{t('study.assignments.add.dueDateLabel', 'Due Date')}</Label>
            <Input id='dueDate' type='date' bind:value={dueDate} />
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='description'>{t('study.assignments.add.descriptionLabel', 'Notes')}</Label>
          <Textarea
            id='description'
            bind:value={description}
            rows={4}
            placeholder={t('study.assignments.add.descriptionPlaceholder', 'Anything important to remember')}
          />
        </div>
        <Dialog.Close disabled={!isAddReady} class='w-full'>
          <Button class='w-full' disabled={!isAddReady} onclick={addAssignment}>{t('add', 'Add')}</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={isEditOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{t('study.assignments.edit.title', 'Edit Assignment')}</Dialog.Title>
      </Dialog.Header>
      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='etitle'>{t('study.assignments.edit.titleLabel', 'Title')}</Label>
          <Input id='etitle' type='text' bind:value={editTitle} />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='esubject'>{t('study.assignments.edit.subjectLabel', 'Subject')}</Label>
            <Input id='esubject' type='text' bind:value={editSubject} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='edueDate'>{t('study.assignments.edit.dueDateLabel', 'Due Date')}</Label>
            <Input id='edueDate' type='date' bind:value={editDueDate} />
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='edescription'>{t('study.assignments.edit.descriptionLabel', 'Notes')}</Label>
          <Textarea
            id='edescription'
            bind:value={editDescription}
            rows={4}
          />
        </div>
        <div class='flex flex-row items-center justify-between border border-input rounded-md px-3 py-2'>
          <div class='flex flex-col'>
            <span class='text-sm font-medium'>{t('study.assignments.edit.completedLabel', 'Completed')}</span>
            <span class='text-xs text-muted'>{t('study.assignments.edit.completedHint', 'Toggle when the assignment is done.')}</span>
          </div>
          <button
            type='button'
            class={`flex h-6 w-10 items-center rounded-full transition-colors ${editCompleted ? 'bg-primary' : 'bg-muted'}`}
            onclick={() => (editCompleted = !editCompleted)}
            aria-label={t('study.assignments.edit.completedAria', 'Assignment completion status')}
            aria-pressed={editCompleted}
          >
            <span class={`mx-1 size-4 rounded-full bg-background transition-transform ${editCompleted ? 'translate-x-4' : ''}`}></span>
          </button>
        </div>
        <div class='flex flex-col gap-2'>
          <Dialog.Close disabled={!isEditReady}>
            <Button class='w-full' disabled={!isEditReady} onclick={saveAssignment}>{t('save', 'Save')}</Button>
          </Dialog.Close>
          <Button variant='destructive' onclick={deleteAssignment}>{t('delete', 'Delete')}</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</SectionContainer>
