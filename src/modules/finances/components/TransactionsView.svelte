<script lang='ts'>
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { Textarea } from '$lib/components/ui/textarea'
  import { finances } from '../store.svelte'

  const selectedSummary = $derived(finances.selectedWalletSummary)
  const transactions = $derived(finances.selectedTransactions)

  let dialogOpen = $state(false)
  let kind = $state<'income' | 'expense'>('income')
  let amount = $state('')
  let occurredAt = $state(new Date().toISOString().slice(0, 10))
  let note = $state('')

  const canAddTransaction = $derived(
    Boolean(selectedSummary && Number.parseFloat(amount) > 0),
  )

  function resetForm() {
    kind = 'income'
    amount = ''
    occurredAt = new Date().toISOString().slice(0, 10)
    note = ''
  }

  async function addTransaction() {
    if (!canAddTransaction || !selectedSummary?.wallet.id)
      return
    const parsed = Number.parseFloat(amount)
    if (!Number.isFinite(parsed) || parsed <= 0)
      return
    const signedAmount = kind === 'expense' ? -parsed : parsed
    await finances.addTransaction({
      walletId: selectedSummary.wallet.id,
      amount: signedAmount,
      occurredAt: occurredAt || new Date().toISOString().slice(0, 10),
      description: note.trim() || null,
    })
    resetForm()
    dialogOpen = false
  }

  async function removeTransaction(id: number | null | undefined) {
    if (id == null)
      return
    await finances.removeTransaction(id)
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

  function formatDate(value: string | null | undefined) {
    if (!value)
      return 'No date'
    const timestamp = Date.parse(value)
    if (!Number.isNaN(timestamp))
      return new Date(timestamp).toLocaleDateString()
    return value
  }
</script>

{#if !selectedSummary}
  <SectionContainer
    title='Overview'
    description='Select a wallet to see its transactions and balance.'
    class='flex flex-col gap-3'
  >
    <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
      <div class='i-fluent:wallet-16-regular size-5'></div>
      <div>Pick a wallet on the left to begin tracking transactions.</div>
    </div>
  </SectionContainer>
{:else}
  <Dialog.Root bind:open={dialogOpen}>
    <div class='flex flex-col gap-4'>
      <SectionContainer
        title={selectedSummary.wallet.name ?? 'Wallet'}
        description='Balance updates as you record transactions.'
        class='flex flex-col gap-4'
      >
        <div class='flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between'>
          <div class='flex flex-col gap-1'>
            <span class='text-sm text-muted'>Current balance</span>
            <span class={`text-3xl font-semibold ${selectedSummary.balance >= 0 ? 'text-foreground' : 'text-destructive'}`}>
              {formatAmount(selectedSummary.balance)}
            </span>
          </div>
          <Dialog.Trigger>
            <Button>Add transaction</Button>
          </Dialog.Trigger>
        </div>
        <div class='grid gap-3 sm:grid-cols-2'>
          <div class='border border-border rounded-lg px-3 py-2'>
            <div class='text-xs text-muted'>Income</div>
            <div class='text-lg text-primary font-semibold'>{formatAmount(selectedSummary.income)}</div>
          </div>
          <div class='border border-border rounded-lg px-3 py-2'>
            <div class='text-xs text-muted'>Expense</div>
            <div class='text-lg text-destructive font-semibold'>-{selectedSummary.expense.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}</div>
          </div>
        </div>
        {#if selectedSummary.wallet.description}
          <div class='border border-border/60 rounded-lg border-dashed bg-muted/20 px-3 py-2 text-sm text-muted'>
            {selectedSummary.wallet.description}
          </div>
        {/if}
      </SectionContainer>

      <SectionContainer
        title='Transactions'
        description='Most recent first.'
        class='flex flex-col gap-3'
      >
        {#if transactions.length === 0}
          <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
            <div class='i-fluent:receipt-20-regular size-5'></div>
            <div>No transactions recorded yet.</div>
          </div>
        {:else}
          <div class='rounded-lg bg-background divide-y'>
            {#each transactions as transaction (transaction.id)}
              <div class='flex flex-row items-center gap-3 px-3 py-2'>
                <div class='min-w-0 flex flex-1 flex-col gap-1'>
                  <div class='text-sm font-medium'>{formatDate(transaction.occurredAt)}</div>
                  {#if transaction.description}
                    <div class='line-clamp-2 text-xs text-muted'>{transaction.description}</div>
                  {/if}
                </div>
                <div class={`text-sm font-semibold ${transaction.amount >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {formatAmount(transaction.amount ?? 0)}
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  class='shrink-0'
                  aria-label='Delete transaction'
                  onclick={() => removeTransaction(transaction.id)}
                >
                  <div class='i-fluent:delete-16-regular size-4'></div>
                </Button>
              </div>
            {/each}
          </div>
        {/if}
      </SectionContainer>
    </div>

    <Dialog.Content class='sm:max-w-md'>
      <Dialog.Header>
        <Dialog.Title>Record transaction</Dialog.Title>
        <Dialog.Description>Positive amounts add to the balance, negative subtract.</Dialog.Description>
      </Dialog.Header>
      <div class='flex flex-col gap-4'>
        <div class='flex items-center gap-2'>
          <Button
            class='flex-1'
            variant={kind === 'income' ? 'default' : 'outline'}
            onclick={() => (kind = 'income')}
          >
            Income
          </Button>
          <Button
            class='flex-1'
            variant={kind === 'expense' ? 'default' : 'outline'}
            onclick={() => (kind = 'expense')}
          >
            Expense
          </Button>
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='transaction-amount'>Amount</Label>
          <Input
            id='transaction-amount'
            type='number'
            min='0'
            step='0.01'
            bind:value={amount}
            placeholder='0.00'
          />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='transaction-date'>Date</Label>
          <Input id='transaction-date' type='date' bind:value={occurredAt} />
        </div>
        <div class='flex flex-col gap-2'>
          <Label for='transaction-note'>Notes</Label>
          <Textarea id='transaction-note' rows={3} bind:value={note} placeholder='Optional description' />
        </div>
        <Button class='w-full' disabled={!canAddTransaction} onclick={addTransaction}>Save transaction</Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}
