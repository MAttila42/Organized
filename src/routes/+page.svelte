<script lang='ts'>
  import ModuleCard from '$lib/components/ModuleCard.svelte'
  import Shortcut from '$lib/components/Shortcut.svelte'
  import { Separator } from '$lib/components/ui/separator'
</script>

<div class='flex flex-col gap-0'>
  <div class='mx-5 my-3 flex flex-row items-center justify-between'>
    <h1 class='text-2xl font-bold'>Organized</h1>
    <a href='/settings' aria-label='Settings'>
      <div class='i-fluent:settings-16-filled size-7'></div>
    </a>
  </div>
  <Separator />
  <div class='mx-2 my-4 flex justify-center'>
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
  <Separator />
  <div class='mx-4 mt-4 flex flex-col gap-4'>
    <ModuleCard />

    <button class='flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:add-12-filled size-6'></div>
      <div>Add Module</div>
    </button>
  </div>
</div>
