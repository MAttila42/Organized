<script lang='ts'>
  import type { ModuleCard } from '$lib/stores/modules.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'
  import { isMobile } from '$lib/utils'
  import { Button } from './ui/button'
  import * as Card from './ui/card'
  import * as ContextMenu from './ui/context-menu'
  import * as Dialog from './ui/dialog'
  import * as Drawer from './ui/drawer'
  import { Input } from './ui/input'
  import { Label } from './ui/label'
  import * as Select from './ui/select'

  const {
    module,
  }: {
    module: ModuleCard
  } = $props()

  type ButtonVariant = 'outline' | 'destructive'
  let isEditing = $state(false)
  let editColor = $state(module.color)
  // Label management state (enabled labels with user link id + base link id)
  interface EnabledLabel {
    userLinkId: number
    linkId: string
    name: string
  }
  let enabledLabels = $state<EnabledLabel[]>([])
  let isLabelsLoading = $state(false)
  let addLabelSelection = $state('')

  // All labels are available (duplicates allowed). IMPORTANT: pass the expression directly to $derived
  // NOT a zero-arg arrow. Using an arrow previously made availableLabels a function; length === 0
  // so UI always thought there were no labels.
  const availableLabels = $derived(moduleStore.getLabels(module.moduleId))

  async function loadLabels() {
    isLabelsLoading = true
    const rows = await moduleStore.getEnabledLabels(module.moduleId)
    const labelDefs = moduleStore.getLabels(module.moduleId)
    const byId = new Map(labelDefs.map(l => [l.id, l]))
    enabledLabels = rows.map((r) => {
      const def = byId.get(r.linkId)
      return { userLinkId: r.id, linkId: r.linkId, name: def?.name ?? r.linkId }
    })
    isLabelsLoading = false
  }

  async function removeLabel(userLinkId: number) {
    await moduleStore.removeLink(userLinkId)
    await loadLabels()
    await moduleStore.loadModuleCards()
  }

  async function addLabelToCard(linkId: string) {
    if (!linkId)
      return
    const position = enabledLabels.length
    await moduleStore.addLabel(module.moduleId, linkId, {}, position)
    await loadLabels()
    await moduleStore.loadModuleCards()
  }

  $effect(() => {
    if (!addLabelSelection)
      return
    const current = addLabelSelection
    // Clear early to avoid re-entrancy if loadLabels triggers reactive flush
    addLabelSelection = ''
    // Fire and forget (errors could be surfaced with a toast in future)
    addLabelToCard(current)
  })

  async function save() {
    await moduleStore.editModuleCard(module.moduleId, { color: editColor })
    isEditing = false
  }

  function cancelEdit() {
    isEditing = false
    editColor = module.color
  }

  function enterEdit() {
    isEditing = true
    loadLabels()
  }

  const actions: { name: string, variant: ButtonVariant, action: () => void }[] = [
    { name: 'Edit', variant: 'outline', action: enterEdit },
    { name: 'Remove', variant: 'destructive', action: () => moduleStore.removeModuleCard(module.moduleId) },
  ]
</script>

{#snippet card()}
  <a href={`/module/${module.moduleId}`} draggable='false'>
    <div class='relative select-none'>
      <div class='absolute h-full w-0.35rem opacity-30 blur-md' style={`background-color: ${module.color}; shadow: 0 0 12px 4px ${module.color};`}></div>
      <Card.Root class='relative z-10 gap-1 b-l-0.35em b-background rounded-md bg-secondary px-3 py-3 pl-2' style={`border-left-color: ${module.color};`}>
        <Card.Header class='px-0'>
          <Card.Title class='w-max rounded-lg bg-background px-3 py-2'>
            {module.name}
          </Card.Title>
        </Card.Header>
        <Card.Content class='px-0'>
          <div class='pointer-events-none flex flex-col gap-2'>
            {#each module.labels as label (label)}
              {#if label.component}
                <label.component {...(label.parameters ?? {})} />
              {/if}
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </a>
{/snippet}

{#if isMobile}
  <Drawer.Root>
    <Drawer.Trigger>
      {@render card()}
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Footer>
        <div class='w-full flex flex-col gap-8'>
          <div class='px-2'>
            {@render card()}
          </div>
          <Drawer.Close class='flex flex-col gap-2'>
            {#each actions as { name, variant, action }}
              <Button {variant} onclick={action}>
                {name}
              </Button>
            {/each}
          </Drawer.Close>
          {#if isEditing}
            <div class='flex flex-col gap-4'>
              <div class='flex flex-col gap-2'>
                <Label for='color-mobile'>Color</Label>
                <Input id='color-mobile' bind:value={editColor} />
              </div>
              <div class='flex flex-col gap-2'>
                <div class='text-sm font-medium'>Labels</div>
                {#if isLabelsLoading}
                  <div class='text-xs text-muted'>Loading labels...</div>
                {:else}
                  <div class='flex flex-col gap-2'>
                    {#if enabledLabels.length === 0}
                      <div class='text-xs text-muted'>No labels added yet.</div>
                    {/if}
                    {#each enabledLabels as l (l.userLinkId)}
                      <div class='flex items-center justify-between b b-border rounded-md px-2 py-1 text-sm'>
                        <span>{l.name}</span>
                        <Button aria-label='Remove label' variant='outline' class='size-7 p-0' onclick={() => removeLabel(l.userLinkId)}>
                          <div class='i-fluent:delete-16-regular size-4'></div>
                        </Button>
                      </div>
                    {/each}
                    <Select.Root type='single' bind:value={addLabelSelection}>
                      <Select.Trigger class='w-full'>{addLabelSelection ? 'Add another label...' : 'Add label...'}</Select.Trigger>
                      <Select.Content>
                        {#if availableLabels.length === 0}
                          <Select.Item value='' disabled>No labels available</Select.Item>
                        {:else}
                          {#each availableLabels as opt (opt.id)}
                            <Select.Item value={opt.id}>{opt.name}</Select.Item>
                          {/each}
                        {/if}
                      </Select.Content>
                    </Select.Root>
                  </div>
                {/if}
              </div>
              <div class='mt-2 flex gap-2'>
                <Button variant='outline' onclick={cancelEdit}>Cancel</Button>
                <Button onclick={save}>Save</Button>
              </div>
            </div>
          {/if}
        </div>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{:else}
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      {@render card()}
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      {#each actions as { name, variant, action }}
        <ContextMenu.Item variant={variant === 'destructive' ? 'destructive' : undefined} onclick={action}>
          {name}
        </ContextMenu.Item>
      {/each}
    </ContextMenu.Content>
  </ContextMenu.Root>
{/if}

{#if !isMobile && isEditing}
  <Dialog.Root open>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit Module Card</Dialog.Title>
      </Dialog.Header>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='color-desktop'>Color</Label>
          <Input id='color-desktop' bind:value={editColor} />
        </div>
        <div class='flex flex-col gap-2'>
          <div class='text-sm font-medium'>Labels</div>
          {#if isLabelsLoading}
            <div class='text-xs text-muted'>Loading labels...</div>
          {:else}
            <div class='flex flex-col gap-2'>
              {#if enabledLabels.length === 0}
                <div class='text-xs text-muted'>No labels added yet.</div>
              {/if}
              {#each enabledLabels as l (l.userLinkId)}
                <div class='flex items-center justify-between b b-border rounded-md px-2 py-1 text-sm'>
                  <span>{l.name}</span>
                  <Button aria-label='Remove label' variant='outline' class='size-7 p-0' onclick={() => removeLabel(l.userLinkId)}>
                    <div class='i-fluent:delete-16-regular size-4'></div>
                  </Button>
                </div>
              {/each}
              <Select.Root type='single' bind:value={addLabelSelection}>
                <Select.Trigger class='w-full'>{addLabelSelection ? 'Add another label...' : 'Add label...'}</Select.Trigger>
                <Select.Content>
                  {#if availableLabels.length === 0}
                    <Select.Item value='' disabled>No labels available</Select.Item>
                  {:else}
                    {#each availableLabels as opt (opt.id)}
                      <Select.Item value={opt.id}>{opt.name}</Select.Item>
                    {/each}
                  {/if}
                </Select.Content>
              </Select.Root>
            </div>
          {/if}
        </div>
        <div class='mt-2 flex gap-2'>
          <Button variant='outline' onclick={cancelEdit}>Cancel</Button>
          <Button onclick={save}>Save</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}
