<script lang='ts'>
  import type { Shortcut } from '$lib/stores/modules.svelte'
  import { t } from '$lib/i18n.svelte'
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
    { name: t('edit', 'Edit'), variant: 'outline', action: () => { isEditing = true } },
    { name: t('remove', 'Remove'), variant: 'destructive', action: () => moduleStore.removeLink(shortcut.id) },
  ]

  $effect(() => {
    if (isMobile)
      isEditing = true
  })
</script>

{#snippet sc()}
  <button
    aria-label={t('shortcut.card.aria', 'Shortcut')}
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
              <Label for='icon-mobile'>{t('icon', 'Icon')}</Label>
              <Input id='icon-mobile' bind:value={editIcon} />
            </div>
            <div class='flex flex-col gap-2'>
              <Label for='color-mobile'>{t('color', 'Color')}</Label>
              <Input id='color-mobile' type='color' bind:value={editColor} />
            </div>
            <div class='mt-2 flex flex-col gap-2'>
              <Drawer.Close class='w-full'>
                <Button class='w-full' onclick={save}>{t('save', 'Save')}</Button>
              </Drawer.Close>
              <Drawer.Close class='w-full'>
                <Button variant='destructive' class='w-full' onclick={() => moduleStore.removeLink(shortcut.id)}>{t('remove', 'Remove')}</Button>
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
        <Dialog.Title>{t('shortcut.edit', 'Edit Shortcut')}</Dialog.Title>
      </Dialog.Header>
      <div class='flex flex-col gap-2'>
        <Label for='icon-desktop'>{t('icon', 'Icon')}</Label>
        <Input id='icon-desktop' bind:value={editIcon} />
        <Label for='color-desktop'>{t('color', 'Color')}</Label>
        <Input id='color-desktop' type='color' bind:value={editColor} />
        <div class='mt-2 flex gap-2'>
          <Button variant='outline' onclick={cancelEdit}>{t('cancel', 'Cancel')}</Button>
          <Button onclick={save}>{t('save', 'Save')}</Button>
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
