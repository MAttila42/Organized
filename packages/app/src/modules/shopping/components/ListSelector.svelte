<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { t } from '$lib/i18n.svelte'
  import { shopping } from '../store.svelte'

  const memberships = $derived(shopping.shared.memberships)
  const isOnline = $derived(shopping.isOnline)
  const isSharedMode = $derived(shopping.isSharedMode)
  const currentListId = $derived(shopping.shared.currentListId)
  const isLocalSelected = $derived(!isSharedMode)

  // Create dialog
  let createOpen = $state(false)
  let createName = $state('')
  let createColor = $state('#2563eb')
  let createDescription = $state('')
  let createLoading = $state(false)
  let createError = $state('')

  // Join dialog
  let joinOpen = $state(false)
  let joinCode = $state('')
  let joinLoading = $state(false)
  let joinError = $state('')
  let joinSuccess = $state(false)

  const canCreate = $derived(Boolean(createName.trim()))
  const canJoin = $derived(Boolean(joinCode.trim()))

  function selectLocal() {
    shopping.useLocal()
  }

  function selectShared(listId: string) {
    if (!isOnline)
      return
    shopping.useShared(listId)
  }

  function handleKeyActivate(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  async function handleCreate() {
    if (!canCreate || createLoading)
      return

    createLoading = true
    createError = ''
    try {
      await shopping.shared.createList({
        name: createName.trim(),
        description: createDescription.trim() || undefined,
        color: createColor.trim() || undefined,
      })
      resetCreate()
      createOpen = false
    }
    catch (error) {
      createError = error instanceof Error ? error.message : 'Failed to create list'
    }
    finally {
      createLoading = false
    }
  }

  function resetCreate() {
    createName = ''
    createColor = '#2563eb'
    createDescription = ''
    createError = ''
  }

  async function handleJoin() {
    if (!canJoin || joinLoading)
      return

    joinLoading = true
    joinError = ''
    try {
      await shopping.shared.joinByCode(joinCode.trim().toUpperCase())
      joinSuccess = true
      joinCode = ''
    }
    catch (error) {
      joinError = error instanceof Error ? error.message : 'Failed to join list'
    }
    finally {
      joinLoading = false
    }
  }

  function resetJoin() {
    joinCode = ''
    joinError = ''
    joinSuccess = false
  }

  async function refreshMemberships() {
    await shopping.shared.loadMemberships()
  }

  // Reset dialogs on close
  $effect(() => {
    if (!createOpen)
      resetCreate()
  })

  $effect(() => {
    if (!joinOpen)
      resetJoin()
  })
</script>

<SectionContainer
  title={t('shopping.lists.title', 'Lists')}
  description={t('shopping.lists.description', 'Manage your shopping lists.')}
  class='flex flex-col gap-3'
>
  <!-- Local list card -->
  <div
    role='button'
    tabindex={0}
    class={`group flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition cursor-pointer ${isLocalSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/40'}`}
    onclick={selectLocal}
    onkeydown={event => handleKeyActivate(event, selectLocal)}
  >
    <div class='flex flex-row items-center justify-between gap-2'>
      <div class='flex flex-row items-center gap-2'>
        <span class='i-fluent:phone-20-regular size-4 text-muted'></span>
        <span class='font-medium'>{t('shopping.lists.local', 'On this device')}</span>
      </div>
    </div>
    <div class='text-xs text-muted'>
      {t('shopping.lists.localDescription', 'Stored offline, only on this device')}
    </div>
  </div>

  <!-- Shared lists section -->
  {#if isOnline}
    <div class='flex items-center justify-between'>
      <span class='text-xs text-muted font-medium tracking-wide uppercase'>
        {t('shopping.lists.shared', 'Shared lists')}
      </span>
      <Button variant='ghost' size='sm' class='h-6 px-2' onclick={refreshMemberships}>
        <span class='i-fluent:arrow-sync-16-regular size-3'></span>
      </Button>
    </div>

    {#if memberships.length === 0}
      <div class='flex flex-row items-center gap-2 rounded-md bg-muted/20 px-3 py-2 text-sm text-muted'>
        <span class='i-fluent:people-community-16-regular size-4'></span>
        <span>{t('shopping.lists.noShared', 'No shared lists yet')}</span>
      </div>
    {:else}
      <div class='flex flex-col gap-2'>
        {#each memberships as membership (membership.listId)}
          <div
            role='button'
            tabindex={0}
            class={`group flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition cursor-pointer ${currentListId === membership.listId ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/40'}`}
            onclick={() => selectShared(membership.listId)}
            onkeydown={event => handleKeyActivate(event, () => selectShared(membership.listId))}
          >
            <div class='flex flex-row items-center justify-between gap-2'>
              <div class='flex flex-row items-center gap-2'>
                {#if membership.color}
                  <span class='size-2.5 rounded-full' style={`background-color:${membership.color}`}></span>
                {:else}
                  <span class='i-fluent:people-community-16-regular size-4 text-muted'></span>
                {/if}
                <span class='font-medium'>{membership.name}</span>
              </div>
              {#if membership.isOwner}
                <span class='text-xs text-muted'>{t('shopping.lists.owner', 'Owner')}</span>
              {/if}
            </div>
            {#if membership.description}
              <div class='line-clamp-1 text-xs text-muted'>
                {membership.description}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    <!-- Action buttons -->
    <div class='flex gap-2'>
      <Dialog.Root bind:open={createOpen}>
        <Dialog.Trigger class='flex-1'>
          <div class='flex flex-row items-center justify-center gap-1.5 border rounded-md border-dashed px-3 py-2 text-sm text-muted transition hover:border-primary/50 hover:text-foreground'>
            <span class='i-fluent:add-12-filled size-4'></span>
            <span>{t('shopping.lists.create', 'Create')}</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Content class='sm:max-w-md'>
          <Dialog.Header>
            <Dialog.Title>{t('shopping.create.title', 'Create shared list')}</Dialog.Title>
            <Dialog.Description>{t('shopping.create.description', 'Create a new list that can be shared with others.')}</Dialog.Description>
          </Dialog.Header>
          <div class='flex flex-col gap-4'>
            <div class='flex flex-col gap-2'>
              <Label for='create-name'>{t('name', 'Name')}</Label>
              <Input id='create-name' bind:value={createName} placeholder={t('shopping.create.namePlaceholder', 'Family groceries')} />
            </div>
            <div class='flex flex-col gap-2'>
              <Label for='create-desc'>{t('description', 'Description')}</Label>
              <Input id='create-desc' bind:value={createDescription} placeholder={t('shopping.create.descPlaceholder', 'Optional notes')} />
            </div>
            <div class='flex flex-col gap-2'>
              <Label for='create-color'>{t('color', 'Color')}</Label>
              <Input id='create-color' type='color' bind:value={createColor} />
            </div>
            {#if createError}
              <p class='text-sm text-destructive'>{createError}</p>
            {/if}
            <Button disabled={!canCreate || createLoading} onclick={handleCreate}>
              {createLoading ? t('creating', 'Creating...') : t('create', 'Create')}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root bind:open={joinOpen}>
        <Dialog.Trigger class='flex-1'>
          <div class='flex flex-row items-center justify-center gap-1.5 border rounded-md border-dashed px-3 py-2 text-sm text-muted transition hover:border-primary/50 hover:text-foreground'>
            <span class='i-fluent:link-16-regular size-4'></span>
            <span>{t('shopping.lists.join', 'Join')}</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Content class='sm:max-w-md'>
          <Dialog.Header>
            <Dialog.Title>{t('shopping.join.title', 'Join shared list')}</Dialog.Title>
            <Dialog.Description>{t('shopping.join.description', 'Enter an invite code to join a shared list.')}</Dialog.Description>
          </Dialog.Header>
          <div class='flex flex-col gap-4'>
            {#if joinSuccess}
              <div class='flex flex-col items-center gap-3 py-4'>
                <span class='i-fluent:checkmark-circle-20-filled size-12 text-primary'></span>
                <p class='text-center font-medium'>{t('shopping.join.success', 'Successfully joined the list!')}</p>
              </div>
              <Dialog.Close>
                <Button class='w-full'>{t('close', 'Close')}</Button>
              </Dialog.Close>
            {:else}
              <div class='flex flex-col gap-2'>
                <Label for='join-code'>{t('shopping.join.codeLabel', 'Invite code')}</Label>
                <Input id='join-code' bind:value={joinCode} placeholder='ABC12DEF' class='text-center tracking-widest font-mono uppercase' />
              </div>
              {#if joinError}
                <p class='text-sm text-destructive'>{joinError}</p>
              {/if}
              <Button disabled={!canJoin || joinLoading} onclick={handleJoin}>
                {joinLoading ? t('joining', 'Joining...') : t('join', 'Join')}
              </Button>
            {/if}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  {:else}
    <div class='flex flex-col gap-2 rounded-md bg-muted/20 px-3 py-3 text-sm text-muted'>
      <div class='flex items-center gap-2'>
        <span class='i-fluent:cloud-off-20-regular size-4'></span>
        <span class='font-medium'>{t('shopping.offline.title', 'Offline mode')}</span>
      </div>
      <p class='text-xs'>
        {t('shopping.offline.description', 'Configure API settings to create and join shared lists.')}
      </p>
    </div>
  {/if}
</SectionContainer>
