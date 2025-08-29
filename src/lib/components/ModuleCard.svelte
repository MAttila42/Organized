<script>
  import { isMobile } from '$lib/utils'
  import { Button } from './ui/button'
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from './ui/card'
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from './ui/context-menu'
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
  } from './ui/drawer'
  import DrawerFooter from './ui/drawer/drawer-footer.svelte'
</script>

{#snippet card()}
  <div class='relative select-none'>
    <div class='absolute h-full w-0.35rem bg-#ddcc33 opacity-30 shadow-[0_0_12px_4px_#ddcc33] blur-md'></div>
    <Card class='relative z-10 gap-1 b-l-0.35em b-background b-l-#ddcc33 rounded-md bg-secondary px-3 py-3 pl-2'>
      <CardHeader class='px-0'>
        <CardTitle class='w-max rounded-lg bg-background px-3 py-2'>Grocery List</CardTitle>
      </CardHeader>
      <CardContent class='px-0'>
        <div class='flex flex-col gap-2 rounded-lg bg-background p-2'>
          <div class='flex items-center justify-between'>
            <span class='font-medium'>Item 1</span>
            <span class='text-sm text-muted'>2 pcs</span>
          </div>
          <div class='flex items-center justify-between'>
            <span class='font-medium'>Item 2</span>
            <span class='text-sm text-muted'>1 pcs</span>
          </div>
          <div class='flex items-center justify-between'>
            <span class='font-medium'>Item 3</span>
            <span class='text-sm text-muted'>5 pcs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
{/snippet}

{#if isMobile}
  <Drawer>
    <DrawerTrigger>
      <a href='/grocery' draggable='false'>
        {@render card()}
      </a>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerFooter>
        <div class='w-full flex flex-col gap-8'>
          <div class='px-2'>
            {@render card()}
          </div>
          <DrawerClose class='flex flex-col gap-2'>
            <Button variant='outline'>
              Edit
            </Button>
            <Button variant='destructive'>
              Remove
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
{:else}
  <ContextMenu>
    <ContextMenuTrigger>
      <a href='/grocery' draggable='false'>
        {@render card()}
      </a>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        Edit
      </ContextMenuItem>
      <ContextMenuItem variant='destructive'>
        Remove
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
{/if}
