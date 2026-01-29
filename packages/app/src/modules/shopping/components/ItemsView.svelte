<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { t } from '$lib/i18n.svelte'
  import { shopping } from '../store.svelte'
  import ListSettings from './ListSettings.svelte'
  import ShoppingItem from './ShoppingItem.svelte'

  const isSharedMode = $derived(shopping.isSharedMode)
  const currentMembership = $derived(shopping.shared.currentMembership)
  const isOwner = $derived(shopping.shared.isOwner)
  const activeItems = $derived(shopping.activeItems)
  const cartItems = $derived(shopping.cartItems)
  const loading = $derived(shopping.shared.loading)
  const error = $derived(shopping.shared.error)

  // Quick add state
  let quickAddName = $state('')
  let quickAddLoading = $state(false)

  // Settings panel
  let settingsOpen = $state(false)

  const canQuickAdd = $derived(Boolean(quickAddName.trim()))

  const title = $derived(
    isSharedMode && currentMembership
      ? currentMembership.name
      : t('shopping.lists.local', 'On this device'),
  )

  const description = $derived(
    isSharedMode && currentMembership?.description
      ? currentMembership.description
      : isSharedMode
      ? t('shopping.shared.description', 'Shared with others')
      : t('shopping.local.description', 'Only visible on this device'),
  )

  async function handleQuickAdd() {
    if (!canQuickAdd || quickAddLoading)
      return

    quickAddLoading = true
    try {
      await shopping.addItem({
        name: quickAddName.trim(),
        quantity: null,
        unit: null,
        description: null,
      })
      quickAddName = ''
    }
    finally {
      quickAddLoading = false
    }
  }

  function handleQuickAddKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && canQuickAdd) {
      event.preventDefault()
      handleQuickAdd()
    }
  }

  async function refresh() {
    if (isSharedMode)
      await shopping.shared.refresh()
  }
</script>

<SectionContainer
  title={title}
  description={description}
  class='flex flex-col gap-3'
>
  <!-- Header actions for shared lists -->
  {#if isSharedMode && currentMembership}
    <div class='flex items-center justify-between gap-2 -mt-1'>
      <div class='flex items-center gap-2'>
        {#if currentMembership.color}
          <span class='size-3 rounded-full' style={`background-color:${currentMembership.color}`}></span>
        {/if}
        {#if isOwner}
          <span class='rounded bg-muted/30 px-1.5 py-0.5 text-xs text-muted'>
            {t('shopping.lists.owner', 'Owner')}
          </span>
        {/if}
      </div>
      <div class='flex items-center gap-1'>
        <Button variant='ghost' size='sm' class='h-7 px-2' onclick={refresh} disabled={loading}>
          <span class={`i-fluent:arrow-sync-16-regular size-4 ${loading ? 'animate-spin' : ''}`}></span>
        </Button>
        <Button variant='ghost' size='sm' class='h-7 px-2' onclick={() => settingsOpen = true}>
          <span class='i-fluent:settings-16-regular size-4'></span>
        </Button>
      </div>
    </div>
  {/if}

  {#if error}
    <div class='flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive'>
      <span class='i-fluent:warning-16-regular size-4'></span>
      <span>{error}</span>
    </div>
  {/if}

  <!-- Quick add input -->
  <div class='flex gap-2'>
    <Input
      bind:value={quickAddName}
      placeholder={t('shopping.quickAdd.placeholder', 'Add item...')}
      class='flex-1'
      onkeydown={handleQuickAddKeydown}
      disabled={quickAddLoading}
    />
    <Button
      size='icon'
      onclick={handleQuickAdd}
      disabled={!canQuickAdd || quickAddLoading}
    >
      <span class={`size-4 ${quickAddLoading ? 'i-fluent:spinner-ios-20-regular animate-spin' : 'i-fluent:add-12-filled'}`}></span>
    </Button>
  </div>

  <!-- Active items -->
  {#if activeItems.length === 0 && cartItems.length === 0}
    <div class='flex flex-col items-center gap-2 border rounded-md border-dashed px-4 py-8 text-center text-muted'>
      <span class='i-fluent:cart-20-regular size-8'></span>
      <p>{t('shopping.empty.title', 'No items yet')}</p>
      <p class='text-xs'>{t('shopping.empty.description', 'Add your first item above')}</p>
    </div>
  {:else if activeItems.length === 0}
    <div class='flex items-center gap-2 rounded-md bg-muted/20 px-3 py-2 text-sm text-muted'>
      <span class='i-fluent:checkmark-circle-16-regular size-4'></span>
      <span>{t('shopping.allInCart', 'All items are in cart!')}</span>
    </div>
  {:else}
    <div class='flex flex-col border rounded-lg divide-y'>
      {#each activeItems as item (`${item.source}:${item.id}`)}
        <ShoppingItem {item} />
      {/each}
    </div>
  {/if}

  <!-- Cart items -->
  {#if cartItems.length > 0}
    <div class='mt-2 flex flex-col gap-2'>
      <div class='flex items-center gap-2 text-sm text-muted'>
        <span class='i-fluent:cart-16-regular size-4'></span>
        <span class='font-medium'>{t('shopping.cart.title', 'In cart')}</span>
        <span class='text-xs'>({cartItems.length})</span>
      </div>
      <div class='flex flex-col border rounded-lg opacity-60 divide-y'>
        {#each cartItems as item (`${item.source}:${item.id}`)}
          <ShoppingItem {item} compact />
        {/each}
      </div>
    </div>
  {/if}
</SectionContainer>

<!-- Settings dialog for shared lists -->
{#if isSharedMode}
  <ListSettings bind:open={settingsOpen} />
{/if}
