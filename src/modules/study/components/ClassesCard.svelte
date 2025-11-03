<script lang='ts'>
  import type { InsertClasses } from '$lib/database/schema/study'
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import * as Select from '$lib/components/ui/select'
  import { study } from '../store.svelte'
  import List from './List.svelte'

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  let subject = $state('')
  let shortName = $state('')
  let teacher = $state('')
  let location = $state('')
  let color = $state('#ffffff')
  let dayStr = $state(String(study.selectedDay))
  let scheduleStr = $state('')

  let editing = $state<null | number>(null)
  let isEditOpen = $state(false)
  let editSubject = $state('')
  let editShortName = $state('')
  let editTeacher = $state('')
  let editLocation = $state('')
  let editColor = $state('#ffffff')
  let editDayStr = $state('')
  let editScheduleStr = $state('')

  function openEdit(item: any) {
    editing = item.id
    editSubject = item.subject ?? ''
    editShortName = item.shortName ?? ''
    editTeacher = item.teacher ?? ''
    editLocation = item.location ?? ''
    editColor = item.color ?? '#ffffff'
    editDayStr = item.day == null ? '' : String(item.day)
    editScheduleStr = item.schedule == null ? '' : String(item.schedule + 1)
    isEditOpen = true
  }

  function closeEdit() {
    isEditOpen = false
    editing = null
  }

  const isEditReady = $derived(!!editSubject.trim() && editing != null)

  async function saveEdit() {
    if (!isEditReady || editing == null)
      return
    const scheduleNum = editScheduleStr ? Number(editScheduleStr) - 1 : null
    await study.updateItem(editing, {
      subject: editSubject.trim(),
      shortName: editShortName.trim() || null,
      teacher: editTeacher.trim() || null,
      location: editLocation.trim() || null,
      color: editColor.trim() || '#FFFFFF',
      day: editDayStr === '' ? null : Number(editDayStr),
      schedule: scheduleNum != null && Number.isFinite(scheduleNum) ? scheduleNum : null,
    })
    closeEdit()
  }

  async function deleteEdit() {
    if (editing == null)
      return
    await study.removeItem(editing)
    closeEdit()
  }

  const isAddReady = $derived(!!subject.trim())

  function resetForm() {
    subject = ''
    shortName = ''
    teacher = ''
    location = ''
    color = '#ffffff'
    dayStr = String(study.selectedDay)
    scheduleStr = ''
  }

  async function addClass() {
    if (!isAddReady)
      return
    const scheduleNum = scheduleStr ? Number(scheduleStr) - 1 : null

    const payload: InsertClasses = {
      subject: subject.trim(),
      shortName: shortName.trim() || null,
      teacher: teacher.trim() || null,
      location: location.trim() || null,
      color: color.trim() || '#FFFFFF',
      day: dayStr === '' ? null : Number(dayStr),
      schedule: scheduleNum != null && Number.isFinite(scheduleNum) ? scheduleNum : null,
    }
    await study.addItem(payload)
    resetForm()
  }

  function changeDay(d: number) {
    study.setDay(d)
    dayStr = String(d)
  }

  const prevDay = $derived(study.neighborDays.prev)
  const currentDay = $derived(study.neighborDays.current)
  const nextDay = $derived(study.neighborDays.next)
  const dayTrigger = $derived(weekDays[Number(dayStr)] ?? 'Day')
  const editDayTrigger = $derived(editDayStr === '' ? 'No day' : weekDays[Number(editDayStr)])
</script>

<SectionContainer
  title='Classes'
  description='Manage your class schedule.'
  class='flex flex-col gap-3'
>
  <div class='flex flex-row items-center justify-center gap-4'>
    <button
      class='b-1 rounded-md bg-background px-3 py-1 text-sm text-muted hover:b-primary'
      onclick={() => changeDay(prevDay)}
    >{weekDays[prevDay]}</button>
    <button
      class='b-2 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground'
      onclick={() => changeDay(currentDay)}
      aria-current='true'
    >{weekDays[currentDay]}</button>
    <button
      class='b-1 rounded-md bg-background px-3 py-1 text-sm text-muted hover:b-primary'
      onclick={() => changeDay(nextDay)}
    >{weekDays[nextDay]}</button>
  </div>

  {#if study.filteredItems.length === 0}
    <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:book-open-16-filled size-5'></div>
      <div>No classes for this day. Add one.</div>
    </div>
  {:else}
    <List items={study.filteredItems} variant='default' edit={openEdit} />
  {/if}

  <Dialog.Root>
    <Dialog.Trigger class='w-full'>
      <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted'>
        <div class='i-fluent:add-12-filled size-5'></div>
        <div>Add Class</div>
      </div>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add Class</Dialog.Title>
      </Dialog.Header>

      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='subject'>Subject</Label>
          <Input id='subject' type='text' bind:value={subject} placeholder='Mathematics' />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='short'>Short</Label>
            <Input id='short' type='text' bind:value={shortName} placeholder='Math' />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='teacher'>Teacher</Label>
            <Input id='teacher' type='text' bind:value={teacher} placeholder='Mr. Smith' />
          </div>
        </div>
        <div class='grid grid-cols-3 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='location'>Location</Label>
            <Input id='location' type='text' bind:value={location} placeholder='Room 101' />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='color'>Color</Label>
            <Input id='color' type='color' bind:value={color} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='day'>Day</Label>
            <Select.Root type='single' bind:value={dayStr}>
              <Select.Trigger id='day' class='w-full'>
                {dayTrigger}
              </Select.Trigger>
              <Select.Content>
                {#each weekDays as d, i}
                  <Select.Item value={String(i)}>{d}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='schedule'>Period (1..)</Label>
          <Input id='schedule' type='number' bind:value={scheduleStr} placeholder='1' />
        </div>
        <Dialog.Close disabled={!isAddReady} class='w-full'>
          <Button class='w-full' disabled={!isAddReady} onclick={addClass}>Add</Button>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={isEditOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit Class</Dialog.Title>
      </Dialog.Header>
      <div class='w-full flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='esubject'>Subject</Label>
          <Input id='esubject' type='text' bind:value={editSubject} />
        </div>
        <div class='grid grid-cols-2 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='eshort'>Short</Label>
            <Input id='eshort' type='text' bind:value={editShortName} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='eteacher'>Teacher</Label>
            <Input id='eteacher' type='text' bind:value={editTeacher} />
          </div>
        </div>
        <div class='grid grid-cols-3 gap-3'>
          <div class='flex flex-col gap-2'>
            <Label for='elocation'>Location</Label>
            <Input id='elocation' type='text' bind:value={editLocation} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='ecolor'>Color</Label>
            <Input id='ecolor' type='color' bind:value={editColor} />
          </div>
          <div class='flex flex-col gap-2'>
            <Label for='eday'>Day</Label>
            <Select.Root type='single' bind:value={editDayStr}>
              <Select.Trigger id='eday' class='w-full'>
                {editDayTrigger}
              </Select.Trigger>
              <Select.Content>
                {#each weekDays as d, i}
                  <Select.Item value={String(i)}>{d}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='eschedule'>Period (1..)</Label>
          <Input id='eschedule' type='number' bind:value={editScheduleStr} />
        </div>
        <div class='flex flex-col gap-2'>
          <Dialog.Close disabled={!isEditReady}>
            <Button class='w-full' disabled={!isEditReady} onclick={saveEdit}>Save</Button>
          </Dialog.Close>
          <Button variant='destructive' onclick={deleteEdit}>Delete</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</SectionContainer>
