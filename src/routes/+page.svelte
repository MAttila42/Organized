<script lang='ts'>
  import ModuleCard from '$lib/components/ModuleCard.svelte'
  import Shortcut from '$lib/components/Shortcut.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import * as Select from '$lib/components/ui/select'
  import { moduleStore } from '$lib/stores/modules.svelte'

  let selectedModule = $state('')
  let color = $state('')

  const triggerContent = $derived(
    moduleStore.modules.find(m => m.id === selectedModule)?.name ?? 'Select a module',
  )

  function addModule() {
    if (!selectedModule)
      return

    moduleStore.addModuleCard(
      selectedModule,
      color,
    )

    selectedModule = ''
    color = ''
  }
</script>

<div class='flex flex-col gap-0'>
  <div class='pt-safe flex flex-row items-center justify-between px-5 pb-3'>
    <h1 class='text-2xl font-bold'>Organized</h1>
    <a href='/settings' aria-label='Settings' draggable='false'>
      <div class='i-fluent:settings-16-filled size-7'></div>
    </a>
  </div>
  <div class='mx-2 my-2 flex justify-center'>
    <div class='grid grid-cols-[repeat(auto-fill,5rem)] w-full justify-center justify-items-center gap-row-5'>
      <Shortcut icon='i-fluent:document-16-filled' --color='#1166dd' />
      <Shortcut icon='i-fluent:people-16-filled' --color='#dd6611' />
      <Shortcut icon='i-fluent:folder-16-filled' --color='#ddcc11' />
      <Shortcut icon='i-fluent:star-16-filled' --color='#dd11cc' />
      <Shortcut icon='i-fluent:settings-16-filled' --color='#11ccdd' />
      <Shortcut icon='i-fluent:globe-16-filled' --color='#ccdd11' />
      <Shortcut icon='i-fluent:note-16-filled' --color='#ddccdd' />

      <button class='size-15 b-3 rounded-2xl b-dashed p-3' aria-label='Add new shortcut'>
        <div class='i-fluent:add-12-filled size-6 color-muted'></div>
      </button>
    </div>
  </div>
  <div class='mx-4 mt-4 flex flex-col gap-4'>
    {#each await moduleStore.moduleCards as module}
      <ModuleCard {module} />
    {/each}

    <Dialog.Root>
      <Dialog.Trigger>
        <div
          class='flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'
        >
          <div class='i-fluent:add-12-filled size-6'></div>
          <div>Add Module</div>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add module</Dialog.Title>
        </Dialog.Header>

        <div class='w-full flex flex-col gap-4'>
          <Select.Root type='single' bind:value={selectedModule}>
            <Select.Trigger class='w-full'>
              {triggerContent}
            </Select.Trigger>
            <Select.Content>
              {#each moduleStore.modules.filter(m => !moduleStore.moduleCards.find(mc => mc.moduleId === m.id)) as module (module.id)}
                <Select.Item value={module.id}>{module.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>

          {#if selectedModule}
            <Dialog.Description class='text-muted'>
              {moduleStore.modules.find(m => m.id === selectedModule)
                ?.description}
            </Dialog.Description>
            <Label for='color'>Color</Label>
            <Input
              bind:value={color}
              type='text'
              id='color'
              placeholder='#FFFFFF'
            />
          {/if}

          <Dialog.Close disabled={!selectedModule}>
            <Button
              onclick={addModule}
              class='w-full'
              disabled={!selectedModule}
            >
              Add Module
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>
