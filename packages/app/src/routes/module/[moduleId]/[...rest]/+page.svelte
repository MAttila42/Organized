<script lang='ts'>
  import { page } from '$app/state'
  import { t } from '$lib/i18n.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'

  const moduleDefinition = $derived(moduleStore.modules.find(m => m.id === page.data.moduleId))
  let ModuleComponent: any = $state(null)
  let loadError = $state<null | string>(null)

  $effect(() => {
    ModuleComponent = null
    loadError = null

    const loader = moduleDefinition?.component
    if (!loader)
      return

    loader()
      .then((mod) => {
        ModuleComponent = mod?.default ?? null
        if (!ModuleComponent)
          loadError = 'component-missing'
      })
      .catch(() => {
        loadError = 'component-load-failed'
      })
  })
</script>

<div class='flex flex-row items-center gap-3 p-2 pt-0'>
  <a href='/' aria-label={t('back', 'Back')} draggable='false'>
    <div class='i-fluent:arrow-left-12-filled size-7'></div>
  </a>
  <h1 class='text-2xl font-bold'>{moduleDefinition?.name}</h1>
</div>

{#if ModuleComponent}
  <ModuleComponent />
{:else if loadError === 'component-missing'}
  <div class='mx-4 border rounded-md border-dashed p-4 text-muted'>
    {t('module.componentMissing', 'The module component is not available.')}
  </div>
{:else if loadError === 'component-load-failed'}
  <div class='mx-4 border rounded-md border-dashed p-4 text-muted'>
    {t('module.componentLoadFailed', 'We could not load this module. Try again later.')}
  </div>
{:else}
  <div class='mx-4 animate-pulse border rounded-md border-dashed p-4 text-muted'>
    {t('loading', 'Loading…')}
  </div>
{/if}
