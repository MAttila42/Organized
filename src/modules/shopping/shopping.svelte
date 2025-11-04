<script lang='ts'>
  import type { InsertShoppingList } from '$lib/database/schema/shopping'
  import SectionContainer from '$lib/components/SectionContainer.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { t } from '$lib/i18n.svelte'
  import List from './components/List.svelte'
  import { shopping } from './store.svelte'

  let name = $state('')
  let quantityStr = $state('')
  let unit = $state('')
  let description = $state('')

  const isAddReady = $derived(!!name.trim())

  async function addItem() {
    if (!isAddReady)
      return

    const q = Number(quantityStr)
    const payload: InsertShoppingList = {
      name: name.trim(),
      quantity: Number.isFinite(q) && !Number.isNaN(q) ? q : null,
      unit: unit.trim() ? unit.trim() : null,
      description: description.trim() ? description.trim() : null,
    }

    await shopping.addItem(payload)

    name = ''
    quantityStr = ''
    unit = ''
    description = ''
  }
</script>

<div class='mx-4 flex flex-col gap-4'>
  <SectionContainer
    title={t('shopping.title', 'Shopping List')}
    description={t('shopping.description', 'Keep track of items to buy.')}
    class='flex flex-col gap-3'
  >
    {#if shopping.items.length === 0}
      <div class='mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted'>
        <div class='i-fluent:cart-16-filled size-5'></div>
        <div>{t('shopping.empty', 'Your list is empty. Add your first item.')}</div>
      </div>
    {:else}
      <List items={shopping.items} variant='default' />
    {/if}

    <Dialog.Root>
      <Dialog.Trigger class='w-full'>
        <div class='flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted'>
          <div class='i-fluent:add-12-filled size-5'></div>
          <div>{t('shopping.add.trigger', 'Add Item')}</div>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t('shopping.add.title', 'Add Item')}</Dialog.Title>
        </Dialog.Header>

        <div class='w-full flex flex-col gap-4'>
          <div class='flex flex-col gap-2'>
            <Label for='name'>{t('shopping.add.nameLabel', 'Name')}</Label>
            <Input id='name' type='text' bind:value={name} placeholder={t('shopping.add.namePlaceholder', 'Milk')} />
          </div>

          <div class='grid grid-cols-2 gap-3'>
            <div class='flex flex-col gap-2'>
              <Label for='qty'>{t('shopping.add.quantityLabel', 'Quantity')}</Label>
              <Input id='qty' type='number' inputmode='numeric' bind:value={quantityStr} placeholder={t('shopping.add.quantityPlaceholder', '2')} />
            </div>
            <div class='flex flex-col gap-2'>
              <Label for='unit'>{t('shopping.add.unitLabel', 'Unit')}</Label>
              <Input id='unit' type='text' bind:value={unit} placeholder={t('shopping.add.unitPlaceholder', 'pcs, l, kg')} />
            </div>
          </div>

          <div class='flex flex-col gap-2'>
            <Label for='desc'>{t('description', 'Description')}</Label>
            <Input id='desc' type='text' bind:value={description} placeholder={t('shopping.add.descriptionPlaceholder', 'Brand or notes (optional)')} />
          </div>

          <Dialog.Close disabled={!isAddReady} class='w-full'>
            <Button class='w-full' disabled={!isAddReady} onclick={addItem}>
              {t('add', 'Add')}
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  </SectionContainer>
</div>
