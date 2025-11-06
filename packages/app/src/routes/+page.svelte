<script lang='ts'>
  import type { LinkParameter } from '$lib/stores/modules.svelte'
  import ModuleCard from '$lib/components/ModuleCard.svelte'
  import Shortcut from '$lib/components/Shortcut.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import * as Select from '$lib/components/ui/select'
  import { t } from '$lib/i18n.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'

  let addModuleValue = $state('')
  let addModuleColor = $state('#FFFFFF')

  const addModuleValueTrigger = $derived(
    moduleStore.modules.find(m => m.id === addModuleValue)?.name ?? t('home.selectModule', 'Select a module'),
  )

  function addModule() {
    if (!addModuleValue)
      return

    moduleStore.addModuleCard(
      addModuleValue,
      addModuleColor,
    )

    addModuleValue = ''
    addModuleColor = '#FFFFFF'
  }

  let addShortcutModule = $state('')
  let addShortcutLink = $state('')
  let addShortcutIcon = $state('')
  let addShortcutColor = $state('#FFFFFF')
  let addShortcutParameters = $state<Record<string, string>>({})
  let addShortcutParametersLinkId = $state<string | null>(null)

  const addShortcutModuleTrigger = $derived(
    moduleStore.modules.find(m => m.id === addShortcutModule)?.name ?? t('home.selectModule', 'Select a module'),
  )
  const addShortcutLinkTrigger = $derived(
    moduleStore.modules
      .find(m => m.id === addShortcutModule)
      ?.links
      .find(l => l.id === addShortcutLink)
      ?.name ?? t('home.selectShortcut', 'Select a shortcut'),
  )
  const addShortcutLinkDefinition = $derived(
    moduleStore.modules
      .find(m => m.id === addShortcutModule)
      ?.links
      .find(l => l.id === addShortcutLink && l.type === 'shortcut') ?? null,
  )
  const addShortcutDescription = $derived(addShortcutLinkDefinition?.description ?? '')
  const addShortcutParameterDefinitions = $derived(
    (Array.isArray(addShortcutLinkDefinition?.parameters)
      ? addShortcutLinkDefinition.parameters
      : []) as LinkParameter[],
  )

  const isAddShortcutReady = $derived(
    Boolean(addShortcutModule && addShortcutLink && addShortcutIcon && addShortcutLinkDefinition),
  )

  $effect(() => {
    const link = addShortcutLinkDefinition
    const parameters = addShortcutParameterDefinitions

    if (!link) {
      addShortcutParameters = {}
      addShortcutParametersLinkId = null
      return
    }

    if (addShortcutParametersLinkId === link.id)
      return

    const defaults: Record<string, string> = {}
    for (const parameter of parameters)
      defaults[parameter.id] = parameter.defaultValue != null ? String(parameter.defaultValue) : ''

    addShortcutParameters = defaults
    addShortcutParametersLinkId = link.id
  })

  function updateShortcutParameter(id: string, value: string) {
    addShortcutParameters = {
      ...addShortcutParameters,
      [id]: value,
    }
  }

  function resetShortcutParameters() {
    addShortcutParameters = {}
    addShortcutParametersLinkId = null
  }

  function addShortcut() {
    if (!isAddShortcutReady)
      return

    moduleStore.addShortcut(
      addShortcutModule,
      addShortcutLink,
      Object.fromEntries(
        Object.entries(addShortcutParameters).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : '']),
      ),
      addShortcutIcon,
      addShortcutColor,
      moduleStore.shortcuts.length,
    )

    addShortcutModule = ''
    addShortcutLink = ''
    addShortcutIcon = ''
    addShortcutColor = '#FFFFFF'
    resetShortcutParameters()
  }
</script>

<div class='flex flex-col gap-0'>
  <div class='flex flex-row items-center justify-between px-5 pb-3'>
    <h1 class='text-2xl font-bold'>{t('home.heading', 'Organized')}</h1>
    <a href='/settings' aria-label={t('home.settings.aria', 'Settings')} draggable='false'>
      <div class='i-fluent:settings-16-filled size-7'></div>
    </a>
  </div>
  <div class='mx-2 my-2 flex justify-center'>
    <div class='grid grid-cols-[repeat(auto-fill,5rem)] w-full justify-center justify-items-center gap-row-5'>
      {#each moduleStore.shortcuts as shortcut (shortcut.id)}
        <Shortcut
          {shortcut}
          onclick={() => shortcut.call(shortcut.parameters)}
        />
      {/each}

      <Dialog.Root>
        <Dialog.Trigger>
          <button class='size-15 b-3 rounded-2xl b-dashed p-3' aria-label={t('home.shortcuts.add.aria', 'Add new shortcut')}>
            <div class='i-fluent:add-12-filled size-6 color-muted'></div>
          </button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{t('home.shortcuts.add.title', 'Add Shortcut')}</Dialog.Title>
          </Dialog.Header>

          <div class='w-full flex flex-col gap-4'>
            <Select.Root type='single' bind:value={addShortcutModule}>
              <Select.Trigger class='w-full'>
                {addShortcutModuleTrigger}
              </Select.Trigger>
              <Select.Content>
                {#each moduleStore.moduleCards as module (module.moduleId)}
                  <Select.Item value={module.moduleId}>{module.name}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>

            {#if addShortcutModule}
              <Select.Root type='single' bind:value={addShortcutLink}>
                <Select.Trigger class='w-full'>
                  {addShortcutLinkTrigger}
                </Select.Trigger>
                <Select.Content>
                  {#each moduleStore.getActions(addShortcutModule) as link (link.id)}
                    <Select.Item value={link.id}>{link.name}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>

              {#if addShortcutLink}
                <Dialog.Description class='text-muted'>
                  {addShortcutDescription}
                </Dialog.Description>

                {#if addShortcutParameterDefinitions.length > 0}
                  <div class='flex flex-col gap-3'>
                    {#each addShortcutParameterDefinitions as parameter (parameter.id)}
                      <div class='flex flex-col gap-2'>
                        <Label for={`shortcut-param-${parameter.id}`}>{parameter.name}</Label>
                        <Input
                          id={`shortcut-param-${parameter.id}`}
                          type={parameter.type === 'number' ? 'number' : 'text'}
                          value={addShortcutParameters[parameter.id] ?? ''}
                          on:input={(event: Event) => updateShortcutParameter(parameter.id, (event.currentTarget as HTMLInputElement | null)?.value ?? '')}
                          placeholder={parameter.defaultValue != null ? String(parameter.defaultValue) : ''}
                        />
                      </div>
                    {/each}
                  </div>
                {/if}

                <Label for='icon'>{t('home.shortcuts.add.iconLabel', 'Icon')}</Label>
                <Input
                  bind:value={addShortcutIcon}
                  type='text'
                  id='icon'
                  placeholder='i-fluent:document-16-filled'
                />
                <Label for='color'>{t('home.shortcuts.add.colorLabel', 'Color')}</Label>
                <Input
                  bind:value={addShortcutColor}
                  type='color'
                  id='color'
                />
              {/if}
            {/if}

            <Dialog.Close disabled={!isAddShortcutReady}>
              <Button
                onclick={addShortcut}
                class='w-full'
                disabled={!isAddShortcutReady}
              >
                {t('home.shortcuts.add.cta', 'Add Shortcut')}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
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
          <div>{t('home.modules.add.trigger', 'Add Module')}</div>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t('home.modules.add.title', 'Add Module')}</Dialog.Title>
        </Dialog.Header>

        <div class='w-full flex flex-col gap-4'>
          <Select.Root type='single' bind:value={addModuleValue}>
            <Select.Trigger class='w-full'>
              {addModuleValueTrigger}
            </Select.Trigger>
            <Select.Content>
              {#each moduleStore.modules.filter(m => !moduleStore.moduleCards.find(mc => mc.moduleId === m.id)) as module (module.id)}
                <Select.Item value={module.id}>{module.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>

          {#if addModuleValue}
            <Dialog.Description class='text-muted'>
              {moduleStore.modules.find(m => m.id === addModuleValue)
                ?.description}
            </Dialog.Description>
            <Label for='color'>{t('color', 'Color')}</Label>
            <Input
              bind:value={addModuleColor}
              type='color'
              id='color'
            />
          {/if}

          <Dialog.Close disabled={!addModuleValue}>
            <Button
              onclick={addModule}
              class='w-full'
              disabled={!addModuleValue}
            >
              {t('home.modules.add.cta', 'Add Module')}
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>
