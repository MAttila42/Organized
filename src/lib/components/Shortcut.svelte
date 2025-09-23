<script lang='ts'>
  import type { Shortcut } from '$lib/stores/modules.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'
  import { isMobile } from '$lib/utils'
  import { Button } from './ui/button'
  import * as ContextMenu from './ui/context-menu'
  import * as Dialog from './ui/dialog'
  import * as Drawer from './ui/drawer'
  import { Input } from './ui/input'
  import { Label } from './ui/label'

  const {
    shortcut,
    class: className = '',
    ...restProps
  }: {
    shortcut: Shortcut
    class?: string
    [x: string]: any
  } = $props()

  type ButtonVariant = 'outline' | 'destructive'
  let isEditing = $state(false)
  let editIcon = $state(shortcut.icon)
  let editColor = $state(shortcut.color)

  async function save() {
    await moduleStore.editShortcut(shortcut.id, {
      icon: editIcon,
      color: editColor,
    })
    isEditing = false
  }

  function cancelEdit() {
    isEditing = false
    editIcon = shortcut.icon
    editColor = shortcut.color
  }

  const actions: { name: string, variant: ButtonVariant, action: () => void }[] = [
    { name: 'Edit', variant: 'outline', action: () => { isEditing = true } },
    { name: 'Remove', variant: 'destructive', action: () => moduleStore.removeLink(shortcut.id) },
  ]

  $effect(() => {
    if (isMobile)
      isEditing = true
  })
</script>

{#snippet sc()}
  <button
    aria-label='Shortcut'
    class={`shortcut border border-accent size-15 rounded-2xl p-4 ${className}`}
    style={`--color: ${shortcut.color}`}
    {...restProps}
  >
    <div class={`icon size-full ${shortcut.icon}`}></div>
  </button>
{/snippet}

{#if isMobile}
  <Drawer.Root>
    <Drawer.Trigger>
      {@render sc()}
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Footer>
        <div class='w-full flex flex-col gap-6'>
          <div class='flex flex-col gap-4'>
            <div class='flex flex-col gap-2'>
              <Label for='icon-mobile'>Icon</Label>
              <Input id='icon-mobile' bind:value={editIcon} />
            </div>
            <div class='flex flex-col gap-2'>
              <Label for='color-mobile'>Color</Label>
              <Input id='color-mobile' type='color' bind:value={editColor} />
            </div>
            <div class='mt-2 flex flex-col gap-2'>
              <Drawer.Close class='w-full'>
                <Button class='w-full' onclick={save}>Save</Button>
              </Drawer.Close>
              <Drawer.Close class='w-full'>
                <Button variant='destructive' class='w-full' onclick={() => moduleStore.removeLink(shortcut.id)}>Remove</Button>
              </Drawer.Close>
            </div>
          </div>
        </div>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{:else}
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      {@render sc()}
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
        <Dialog.Title>Edit Shortcut</Dialog.Title>
      </Dialog.Header>
      <div class='flex flex-col gap-2'>
        <Label for='icon-desktop'>Icon</Label>
        <Input id='icon-desktop' bind:value={editIcon} />
        <Label for='color-desktop'>Color</Label>
        <Input id='color-desktop' type='color' bind:value={editColor} />
        <div class='mt-2 flex gap-2'>
          <Button variant='outline' onclick={cancelEdit}>Cancel</Button>
          <Button onclick={save}>Save</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}

<style>
  .shortcut {
    --bg: #282828;
    box-shadow:
      inset 0 0 2em var(--bg),
      inset 0 0 4em var(--bg),
      inset 0 0 6em var(--bg);
    outline: 1px solid hsl(var(--background));
    background-color: var(--color);
  }

  .icon {
    color: var(--color);
  }
</style>
