<script module lang='ts'>
  export type ItemVariant = 'default' | 'compact'
</script>

<script lang='ts'>
  import type { SelectShoppingList } from '$lib/database/schema/shopping'
  import { shopping } from '../store.svelte'
  import Badge from './Badge.svelte'

  const {
    item,
    variant = 'default',
  }: {
    item: SelectShoppingList
    variant?: ItemVariant
  } = $props()

  const isInCart = $derived(Boolean(item.inCart))

  function handleClick() {
    shopping.toggleCart(item.id)
  }
</script>

{#snippet badges()}
  {#if item.quantity || item.unit}
    <Badge>{item.quantity ?? ''} {item.unit ?? ''}</Badge>
  {/if}
{/snippet}

<button
  class={`flex flex-col items-start gap-1 p-2 transition ${isInCart ? 'opacity-60' : ''}`}
  aria-pressed={isInCart}
  data-state={isInCart ? 'in-cart' : 'default'}
  onclick={handleClick}
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
