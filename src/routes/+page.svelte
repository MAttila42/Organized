<script lang='ts'>
  import type { PageProps } from './$types'
  import { Button } from '$lib/components/ui/button'
  import { test } from '$lib/database/schema'
  import i18n from '$lib/i18n.svelte'

  const { data }: PageProps = $props()
  const database = data.database
  let records = $state(data.records || [])

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

  function toggleLocale() {
    i18n.setLocale(i18n.locale === 'en-US' ? 'hu-HU' : 'en-US')
  }
</script>

<h1 class='pb-2 pt-6 text-center text-4xl font-bold'>Organized</h1>
<div class='m-5 flex flex-col gap-5'>
  <div class='flex flex-col gap-2'>
    <Button class='w-full' onclick={testInsert}>
      <div class='i-fluent:add-square-16-filled size-4'></div>
      {i18n.t('insertButton', 'Add record')}
    </Button>
    <Button class='w-full' onclick={purge}>
      <div class='i-fluent:delete-16-filled size-4'></div>
      {i18n.t('purgeButton', 'Purge')}
    </Button>
    <Button class='w-full' onclick={toggleLocale}>
      <div class='i-fluent:globe-28-filled size-4'></div>
      {i18n.t('toggleLang', 'Toggle language')}
    </Button>
  </div>

  <div class='flex flex-col gap-2'>
    {#each records as record (record.id)}
      <p>{record.test}</p>
    {/each}
  </div>
</div>
