<script module lang='ts'>
  export type ItemVariant = 'default' | 'compact'
</script>

<script lang='ts'>
  import type { ShoppingItem } from '../store.svelte'
  import { t } from '$lib/i18n.svelte'
  import { shopping } from '../store.svelte'
  import Badge from './Badge.svelte'

  const {
    item,
    variant = 'default',
  }: {
    item: ShoppingItem
    variant?: ItemVariant
  } = $props()

  const isSharedItem = $derived(item.source === 'shared')
  const isInCart = $derived(Boolean(item.inCart))
  const canEdit = $derived(shopping.canEdit)
  const showRemoveAction = $derived(canEdit && ((variant === 'compact' && isInCart) || isSharedItem))
  const removeLabel = $derived(isSharedItem
    ? t('shopping.actions.deleteShared', 'Delete item')
    : t('shopping.actions.removeFromCart', 'Remove from cart'))

  function handleClick() {
    if (!canEdit)
      return
    shopping.toggleCart(item.id)
  }

  async function handleRemove(event: Event) {
    event.stopPropagation()
    await shopping.removeItem(item.id)
  }
</script>

{#snippet badges()}
  {#if item.quantity || item.unit}
    <Badge>{item.quantity ?? ''} {item.unit ?? ''}</Badge>
  {/if}
{/snippet}

<div class={`flex w-full ${showRemoveAction ? 'items-stretch gap-1 pr-2' : ''}`}>
  <button
    type='button'
    class={`flex-1 flex flex-col items-start gap-1 p-2 text-left transition ${isInCart ? 'opacity-60' : ''}`}
    aria-pressed={isInCart}
    data-state={isInCart ? 'in-cart' : 'default'}
    onclick={handleClick}
    disabled={!canEdit}
  >
    <div class={`max-w-full flex flex-row gap-2 ${variant === 'compact' ? 'w-full justify-between items-center' : 'items-start'}`}>
      <div class='flex flex-row items-center gap-2'>
        <span class={`font-medium ${isInCart ? 'line-through text-muted' : ''}`}>{item.name}</span>
        {#if item.description}
          <div class='truncate text-start text-sm text-muted'>{item.description}</div>
        {/if}
      </div>
      {#if variant === 'compact'}
        {@render badges()}
      {/if}
    </div>
    {#if variant === 'default'}
      {@render badges()}
    {/if}
  </button>

  {#if showRemoveAction}
    <button
      type='button'
      class='my-1 flex items-center justify-center rounded-md px-2 text-destructive transition hover:bg-destructive/10 disabled:opacity-60'
      aria-label={removeLabel}
      title={removeLabel}
      onclick={handleRemove}
    >
      <span class='i-fluent:delete-20-regular size-5'></span>
    </button>
  {/if}
</div>
