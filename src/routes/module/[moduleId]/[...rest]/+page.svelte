<script lang='ts'>
  import { page } from '$app/state'
  import { t } from '$lib/i18n.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'

  const module = moduleStore.modules.find(m => m.id === page.data.moduleId)
  const ModuleComponent = (await module?.component())?.default
</script>

<div class='flex flex-row items-center gap-3 p-2 pt-0'>
  <a href='/' aria-label={t('back', 'Back')} draggable='false'>
    <div class='i-fluent:arrow-left-12-filled size-7'></div>
  </a>
  <h1 class='text-2xl font-bold'>{module?.name}</h1>
</div>

<ModuleComponent />
