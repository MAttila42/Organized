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

  const {
    module,
  }: {
    module: ModuleCard
  } = $props()

  type ButtonVariant = 'outline' | 'destructive'
  let isEditing = $state(false)
  let editColor = $state(module.color)

  async function save() {
    await moduleStore.editModuleCard(module.moduleId, { color: editColor })
    isEditing = false
  }

  function cancelEdit() {
    isEditing = false
    editColor = module.color
  }

  const actions: { name: string, variant: ButtonVariant, action: () => void }[] = [
    { name: 'Edit', variant: 'outline', action: () => { isEditing = true } },
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
          <div class='pointer-events-none'>
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
            <div class='flex flex-col gap-2'>
              <Label for='color-mobile'>Color</Label>
              <Input id='color-mobile' bind:value={editColor} />
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
      <div class='flex flex-col gap-2'>
        <Label for='color-desktop'>Color</Label>
        <Input id='color-desktop' bind:value={editColor} />
        <div class='mt-2 flex gap-2'>
          <Button variant='outline' onclick={cancelEdit}>Cancel</Button>
          <Button onclick={save}>Save</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}
