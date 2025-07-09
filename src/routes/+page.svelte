<script lang='ts'>
  import { page } from '$app/state'
  import image from '$lib/assets/logo-512.png'
  import { Button } from '$lib/components/ui/button'
  import { test } from '$lib/database/schema'
  import i18n, { t } from '$lib/i18n.svelte'

  const database = page.data.database
  let records = $state(page.data.records || [])

  async function testInsert() {
    await database.insert(test).values({
      test: Date.now().toString(),
    })
    records = await database.query.test.findMany()
  }

  async function purge() {
    await database.delete(test).all()
    records.length = 0
  }

  function nextLocale() {
    const currentIndex = i18n.locales.indexOf(i18n.locale)
    i18n.locale = i18n.locales[(currentIndex + 1) % i18n.locales.length]
  }
</script>

<div class='flex flex-col gap-5 p-5'>
  <div class='flex flex-row items-center gap-3'>
    <img src={image} alt='Organized Logo' class='size-16 bg-inherit p-1' />
    <div>
      <h1 class='text-3xl font-bold'>Organized</h1>
      <p class='text-sm text-muted-foreground'>
        {t('home.oneliner', 'Your everyday companion app')}
      </p>
    </div>
  </div>
  <div class='flex flex-col gap-2'>
    <Button class='w-full' onclick={testInsert}>
      <div class='i-fluent:add-square-16-filled size-4'></div>
      {t('ui.insert', 'Add record')}
    </Button>
    <Button class='w-full' onclick={purge}>
      <div class='i-fluent:delete-16-filled size-4'></div>
      {t('ui.purge', 'Purge')}
    </Button>
    <Button class='w-full' onclick={nextLocale}>
      <div class='i-fluent:globe-28-filled size-4'></div>
      {t('ui.toggleLang', 'Toggle language')}
    </Button>
  </div>

  <div class='flex flex-col gap-2'>
    {#each records as record (record.id)}
      <p>{record.test}</p>
    {/each}
  </div>
</div>
