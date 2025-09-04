<script lang='ts'>
  import { page } from '$app/state'
  import { moduleStore } from '$lib/stores/modules.svelte'

  const module = moduleStore.modules.find(m => m.id === page.data.moduleId)
  const ModuleComponent = (await module?.component())?.default
</script>

<div class='flex flex-row items-center gap-3 p-3 pt-safe'>
  <a href='/' aria-label='Settings' draggable='false'>
    <div class='i-fluent:arrow-left-12-filled size-7'></div>
  </a>
  <h1 class='text-2xl font-bold'>{module?.name}</h1>
</div>

<ModuleComponent />
