<script lang='ts'>
  import type { InsertExams, SelectExams } from '$lib/database/schema/study'
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { Textarea } from '$lib/components/ui/textarea'
  import { t } from '$lib/i18n.svelte'
  import { createShortcutDialogSync, createShortcutRoute } from '../../utils'
  import { study } from '../store.svelte'
  import ExamsList from './ExamsList.svelte'

  function getExamTimestamp(value: string | null | undefined) {
    if (!value)
      return Number.POSITIVE_INFINITY
    const timestamp = new Date(value).getTime()
    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp
  }

  const sortedExams = $derived(
    [...study.exams].sort((a, b) => {
      const aTime = getExamTimestamp(a.date)
      const bTime = getExamTimestamp(b.date)
      const aDone = Number.isFinite(aTime) && aTime < Date.now()
      const bDone = Number.isFinite(bTime) && bTime < Date.now()

      if (aDone !== bDone)
        return aDone ? 1 : -1
      if (Number.isFinite(aTime) && Number.isFinite(bTime))
        return aTime - bTime
      if (Number.isFinite(aTime))
        return -1
      if (Number.isFinite(bTime))
        return 1

      return (a.id ?? 0) - (b.id ?? 0)
    }),
  )

  let title = $state('')
  let subject = $state('')
  let date = $state('')
  let description = $state('')
  let isAddDialogOpen = $state(false)

  let editing = $state<null | number>(null)
  let isEditOpen = $state(false)
  let editTitle = $state('')
  let editSubject = $state('')
  let editDate = $state('')
  let editDescription = $state('')

  const isAddReady = $derived(!!title.trim() && !!date)
  const isEditReady = $derived(!!editTitle.trim() && !!editDate && editing != null)
  const addRouteKey = 'add-exam'
  const addExamRoute = createShortcutRoute('study', addRouteKey)
  const syncAddExamDialog = createShortcutDialogSync(
    addExamRoute,
    () => isAddDialogOpen,
    (value) => { isAddDialogOpen = value },
  )

  $effect(syncAddExamDialog)

  function resetForm() {
    title = ''
    subject = ''
    date = ''
    description = ''
  }

  function openEdit(item: SelectExams) {
    editing = item.id ?? null
    if (editing == null)
      return
    editTitle = item.title ?? ''
    editSubject = item.subject ?? ''
    editDate = item.date ?? ''
    editDescription = item.description ?? ''
    isEditOpen = true
  }

  function closeEdit() {
    isEditOpen = false
    editing = null
  }

  async function addExam() {
    if (!isAddReady)
      return
    const payload: InsertExams = {
      title: title.trim(),
      subject: subject.trim() || null,
      date,
      description: description.trim() || null,
    }
    await study.addExam(payload)
    resetForm()
  }

  async function saveExam() {
    if (!isEditReady || editing == null)
      return
    await study.updateExam(editing, {
      title: editTitle.trim(),
      subject: editSubject.trim() || null,
      date: editDate,
      description: editDescription.trim() || null,
    })
    closeEdit()
  }

  async function deleteExam() {
    if (editing == null)
      return
    await study.removeExam(editing)
    closeEdit()
  }

</script>

<SectionContainer
  title={t('study.exams.title', 'Exams')}
  description={t('study.exams.description', 'Keep track of upcoming exams.')}
  class='flex flex-col gap-3'
>
  {#if sortedExams.length === 0}
    <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:calendar-ltr-16-filled size-5'></div>
      <div>{t('study.exams.empty', 'No exams yet. Add one.')}</div>
    </div>
  {:else}
    <ExamsList items={sortedExams} edit={openEdit} />
  {/if}

  <Dialog.Root bind:open={isAddDialogOpen}>
    <Dialog.Trigger class='w-full'>
      <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted'>
        <div class='i-fluent:add-12-filled size-5'></div>
        <div>{t('study.exams.add.trigger', 'Add Exam')}</div>
      </div>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{t('study.exams.add.title', 'Add Exam')}</Dialog.Title>
      </Dialog.Header>

      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='title'>{t('study.exams.add.titleLabel', 'Title')}</Label>
          <Input id='title' type='text' bind:value={title} placeholder={t('study.exams.add.titlePlaceholder', 'Midterm 1')} />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='subject'>{t('study.exams.add.subjectLabel', 'Subject')}</Label>
            <Input id='subject' type='text' bind:value={subject} placeholder={t('study.exams.add.subjectPlaceholder', 'Physics')} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='date'>{t('date', 'Date')}</Label>
            <Input id='date' type='date' bind:value={date} required />
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='description'>{t('study.exams.add.descriptionLabel', 'Notes')}</Label>
          <Textarea
            id='description'
            bind:value={description}
            rows={4}
            placeholder={t('study.exams.add.descriptionPlaceholder', 'Topics, room, anything important')}
          />
        </div>
        <Dialog.Close disabled={!isAddReady} class='w-full'>
          <Button class='w-full' disabled={!isAddReady} onclick={addExam}>{t('add', 'Add')}</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={isEditOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{t('study.exams.edit.title', 'Edit Exam')}</Dialog.Title>
      </Dialog.Header>
      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='etitle'>{t('study.exams.edit.titleLabel', 'Title')}</Label>
          <Input id='etitle' type='text' bind:value={editTitle} />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='esubject'>{t('study.exams.edit.subjectLabel', 'Subject')}</Label>
            <Input id='esubject' type='text' bind:value={editSubject} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='edate'>{t('date', 'Date')}</Label>
            <Input id='edate' type='date' bind:value={editDate} required />
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='edescription'>{t('study.exams.edit.descriptionLabel', 'Notes')}</Label>
          <Textarea
            id='edescription'
            bind:value={editDescription}
            rows={4}
          />
        </div>
        <div class='flex flex-col gap-2'>
          <Dialog.Close disabled={!isEditReady}>
            <Button disabled={!isEditReady} onclick={saveExam}>{t('save', 'Save')}</Button>
          </Dialog.Close>
          <Button variant='destructive' onclick={deleteExam}>{t('delete', 'Delete')}</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</SectionContainer>
