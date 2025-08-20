<script lang='ts'>
  import Shortcut from '$lib/components/Shortcut.svelte'
  import { Separator } from '$lib/components/ui/separator'

// import { Button } from '$lib/components/ui/button'
  // import i18n, { t } from '$lib/i18n.svelte'

  // function nextLocale() {
  //   const currentIndex = i18n.locales.indexOf(i18n.locale)
  //   i18n.locale = i18n.locales[(currentIndex + 1) % i18n.locales.length]
  // }
</script>

<div class='flex flex-col gap-0'>
  <div class='my-3 mx-5 flex flex-row items-center justify-between'>
    <h1 class='text-2xl font-bold'>Organized</h1>
    <a href='/settings' aria-label='Settings'>
      <div class='i-fluent:settings-16-filled size-7'></div>
    </a>
  </div>
  <!-- <div class='flex flex-col gap-2'>
    <Button class='w-full' onclick={nextLocale}>
      <div class='i-fluent:globe-28-filled size-4'></div>
      {t('ui.toggleLang', 'Toggle language')}
    </Button>
  </div>
  <p>Text</p> -->
  <Separator />
  <div class='my-4 mx-2 flex justify-center'>
    <div class='grid grid-cols-[repeat(auto-fill,5rem)] w-full justify-center justify-items-center gap-row-5'>
      <Shortcut icon='i-fluent:document-16-filled' --color='#1166dd' />
      <Shortcut icon='i-fluent:people-16-filled' --color='#dd6611' />
      <Shortcut icon='i-fluent:folder-16-filled' --color='#ddcc11' />
      <Shortcut icon='i-fluent:star-16-filled' --color='#dd11cc' />
      <Shortcut icon='i-fluent:settings-16-filled' --color='#11ccdd' />
      <Shortcut icon='i-fluent:globe-16-filled' --color='#ccdd11' />
      <Shortcut icon='i-fluent:note-16-filled' --color='#ddccdd' />
      <Shortcut icon='i-fluent:camera-16-filled' --color='#11dd33' />
    </div>
  </div>
  <Separator />
</div>
