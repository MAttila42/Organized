<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { finances } from '../store.svelte'

  const walletSummaries = $derived(finances.walletSummaries)
  const selectedId = $derived(finances.selectedWalletId)

  let createOpen = $state(false)
  let name = $state('')
  let color = $state('#2563EB')
  let description = $state('')

  let editOpen = $state(false)
  let editingId = $state<number | null>(null)
  let editName = $state('')
  let editColor = $state('#2563EB')
  let editDescription = $state('')

  const canCreate = $derived(Boolean(name.trim()))
  const canSave = $derived(Boolean(editingId != null && editName.trim()))

  function selectWallet(id: number | null) {
    finances.selectWallet(id)
  }

  function handleKeyActivate(event: KeyboardEvent, id: number | null) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectWallet(id)
    }
  }

  async function createWallet() {
    if (!canCreate)
      return
    await finances.addWallet({
      name: name.trim(),
      color: color || '#2563EB',
      description: description.trim() || null,
    })
    resetCreate()
    createOpen = false
  }

  function resetCreate() {
    name = ''
    color = '#2563EB'
    description = ''
  }

  function openEdit(id: number | null, currentName: string, currentColor: string | null | undefined, currentDescription: string | null | undefined) {
    if (id == null)
      return
    editingId = id
    editName = currentName
    editColor = currentColor || '#2563EB'
    editDescription = currentDescription || ''
    editOpen = true
  }

  function closeEdit() {
    editOpen = false
    editingId = null
  }

  async function saveWallet() {
    if (!canSave || editingId == null)
      return
    await finances.updateWallet(editingId, {
      name: editName.trim(),
      color: editColor || '#2563EB',
      description: editDescription.trim() || null,
    })
    closeEdit()
  }

  async function deleteWallet() {
    if (editingId == null)
      return
    await finances.removeWallet(editingId)
    closeEdit()
  }

  function formatAmount(value: number) {
    if (!Number.isFinite(value))
      return '0.00'
    const sign = value >= 0 ? '+' : '-'
    const absolute = Math.abs(value)
    return `${sign}${absolute.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
</script>

<SectionContainer
  title='Wallets'
  description='Create wallets to separate budgets and savings.'
  class='flex flex-col gap-3'
>
  {#if walletSummaries.length === 0}
    <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:wallet-credit-card-20-regular size-5'></div>
      <div>No wallets yet. Add your first wallet to get started.</div>
    </div>
  {:else}
    <div class='flex flex-col gap-2'>
      {#each walletSummaries as summary (summary.wallet.id)}
        <div
          role='button'
          tabindex={summary.wallet.id != null ? 0 : -1}
          class={`group flex flex-col gap-2 rounded-lg border px-3 py-2 text-left transition ${summary.wallet.id === selectedId ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/40'}`}
          onclick={() => selectWallet(summary.wallet.id ?? null)}
          onkeydown={event => handleKeyActivate(event, summary.wallet.id ?? null)}
        >
          <div class='flex flex-row items-center justify-between gap-2'>
            <div class='flex flex-row items-center gap-2'>
              <span class='size-2.5 rounded-full' style={`background: ${summary.wallet.color || '#64748B'}`}></span>
              <span class='font-medium'>{summary.wallet.name}</span>
            </div>
            <div class={`text-sm font-semibold ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {formatAmount(summary.balance)}
            </div>
          </div>
          {#if summary.wallet.description}
            <div class='line-clamp-2 text-xs text-muted'>
              {summary.wallet.description}
            </div>
          {/if}
          <div class='flex flex-row items-center justify-between text-xs text-muted'>
            <div>{summary.transactionCount} {summary.transactionCount === 1 ? 'transaction' : 'transactions'}</div>
            <button
              type='button'
              class='opacity-0 transition group-hover:opacity-100'
              onclick={(event) => {
                event.stopPropagation()
                openEdit(summary.wallet.id ?? null, summary.wallet.name ?? '', summary.wallet.color, summary.wallet.description)
              }}
              aria-label='Edit wallet details'
            >
              <div class='i-fluent:edit-16-regular size-4'></div>
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <Dialog.Root bind:open={createOpen}>
    <Dialog.Trigger class='w-full'>
      <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted'>
        <div class='i-fluent:add-12-filled size-5'></div>
        <div>Add Wallet</div>
      </div>
    </Dialog.Trigger>
    <Dialog.Content class='sm:max-w-md'>
      <Dialog.Header>
        <Dialog.Title>New Wallet</Dialog.Title>
        <Dialog.Description>Set a name, color, and optional description.</Dialog.Description>
      </Dialog.Header>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='wallet-name'>Name</Label>
          <Input id='wallet-name' bind:value={name} placeholder='Everyday spending' />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='wallet-color'>Color</Label>
          <Input id='wallet-color' type='color' bind:value={color} />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='wallet-description'>Description</Label>
          <Input id='wallet-description' bind:value={description} placeholder='Short notes' />
        </div>
        <Button class='w-full' disabled={!canCreate} onclick={createWallet}>Create wallet</Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>

  <Dialog.Root bind:open={editOpen}>
    <Dialog.Content class='sm:max-w-md'>
      <Dialog.Header>
        <Dialog.Title>Edit Wallet</Dialog.Title>
      </Dialog.Header>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Label for='edit-wallet-name'>Name</Label>
          <Input id='edit-wallet-name' bind:value={editName} />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='edit-wallet-color'>Color</Label>
          <Input id='edit-wallet-color' type='color' bind:value={editColor} />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='edit-wallet-description'>Description</Label>
          <Input id='edit-wallet-description' bind:value={editDescription} />
        </div>
        <div class='flex flex-col gap-2'>
          <Button class='w-full' disabled={!canSave} onclick={saveWallet}>Save changes</Button>
          <Button variant='destructive' onclick={deleteWallet}>Delete wallet</Button>
          <Button variant='ghost' onclick={closeEdit}>Cancel</Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</SectionContainer>
