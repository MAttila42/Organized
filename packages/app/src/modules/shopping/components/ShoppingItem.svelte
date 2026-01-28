<script lang='ts'>
  import type { ShoppingItem as ShoppingItemType } from '../store.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { t } from '$lib/i18n.svelte'
  import { shopping } from '../store.svelte'

  const {
    item,
    compact = false,
  }: {
    item: ShoppingItemType
    compact?: boolean
  } = $props()

  const isInCart = $derived(Boolean(item.inCart))

  // Edit dialog state
  let editOpen = $state(false)
  let editName = $state('')
  let editQuantity = $state('')
  let editUnit = $state('')
  let editDescription = $state('')

  const hasDetails = $derived(Boolean(item.quantity || item.unit || item.description))

  function openEdit() {
    editName = item.name
    editQuantity = item.quantity ?? ''
    editUnit = item.unit ?? ''
    editDescription = item.description ?? ''
    editOpen = true
  }

  async function handleToggleCart() {
    await shopping.toggleCart(item.id)
  }

  async function handleDelete() {
    await shopping.removeItem(item.id)
    editOpen = false
  }

  function formatDetails(): string {
    const parts: string[] = []
    if (item.quantity)
      parts.push(item.quantity)
    if (item.unit)
      parts.push(item.unit)
    return parts.join(' ')
  }
</script>

<div class={`group flex items-center gap-2 px-3 py-2.5 transition ${compact ? 'py-2' : ''}`}>
  <!-- Checkbox -->
  <button
    type='button'
    class={`flex-shrink-0 size-5 rounded-md border-2 flex items-center justify-center transition ${isInCart ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30 hover:border-primary/50'}`}
    onclick={handleToggleCart}
    aria-label={isInCart ? t('shopping.item.uncheck', 'Remove from cart') : t('shopping.item.check', 'Add to cart')}
  >
    {#if isInCart}
      <span class='i-fluent:checkmark-12-filled size-3'></span>
    {/if}
  </button>

  <!-- Content -->
  <button
    type='button'
    class='min-w-0 flex flex-1 flex-col items-start gap-0.5 text-left'
    onclick={openEdit}
  >
    <div class='w-full flex items-center gap-2'>
      <span class={`font-medium truncate ${isInCart ? 'line-through text-muted' : ''}`}>
        {item.name}
      </span>
      {#if hasDetails && !compact}
        <span class='flex-shrink-0 rounded bg-muted/30 px-1.5 py-0.5 text-xs text-muted'>
          {formatDetails()}
        </span>
      {/if}
    </div>
    {#if item.description && !compact}
      <span class='w-full truncate text-xs text-muted'>
        {item.description}
      </span>
    {/if}
  </button>

  <!-- Quick delete for cart items -->
  {#if isInCart}
    <button
      type='button'
      class='size-7 flex flex-shrink-0 items-center justify-center rounded-md text-muted opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100'
      onclick={handleDelete}
      aria-label={t('shopping.item.delete', 'Delete item')}
    >
      <span class='i-fluent:delete-16-regular size-4'></span>
    </button>
  {/if}
</div>

<!-- Edit dialog -->
<Dialog.Root bind:open={editOpen}>
  <Dialog.Content class='sm:max-w-md'>
    <Dialog.Header>
      <Dialog.Title>{t('shopping.item.edit.title', 'Edit item')}</Dialog.Title>
    </Dialog.Header>
    <div class='flex flex-col gap-4'>
      <div class='flex flex-col gap-2'>
        <Label for='edit-name'>{t('name', 'Name')}</Label>
        <Input id='edit-name' bind:value={editName} />
      </div>
      <div class='grid grid-cols-2 gap-3'>
        <div class='flex flex-col gap-2'>
          <Label for='edit-qty'>{t('shopping.item.quantity', 'Quantity')}</Label>
          <Input id='edit-qty' bind:value={editQuantity} placeholder='2' />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='edit-unit'>{t('shopping.item.unit', 'Unit')}</Label>
          <Input id='edit-unit' bind:value={editUnit} placeholder='pcs, kg, l' />
        </div>
      </div>
      <div class='flex flex-col gap-2'>
        <Label for='edit-desc'>{t('description', 'Description')}</Label>
        <Input id='edit-desc' bind:value={editDescription} placeholder={t('shopping.item.descPlaceholder', 'Notes or brand')} />
      </div>
      <div class='flex gap-2'>
        <Button variant='destructive' class='flex-1' onclick={handleDelete}>
          <span class='i-fluent:delete-16-regular mr-1 size-4'></span>
          {t('delete', 'Delete')}
        </Button>
        <Dialog.Close class='flex-1'>
          <Button variant='outline' class='w-full'>{t('close', 'Close')}</Button>
        </Dialog.Close>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
