<script lang='ts'>
  import type { ModuleCard } from '$lib/stores/modules.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'
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

  const {
    module,
  }: {
    module: ModuleCard
  } = $props()
</script>

{#snippet card()}
  <div class='relative select-none'>
    <div class='absolute h-full w-0.35rem opacity-30 blur-md' style={`background-color: ${module.color}; shadow: 0 0 12px 4px ${module.color};`}></div>
    <Card class='relative z-10 gap-1 b-l-0.35em b-background rounded-md bg-secondary px-3 py-3 pl-2' style={`border-left-color: ${module.color};`}>
      <CardHeader class='px-0'>
        <CardTitle class='w-max rounded-lg bg-background px-3 py-2'>
          {module.name}
        </CardTitle>
      </CardHeader>
      <CardContent class='px-0'>
        <!-- <div class='flex flex-col gap-2 rounded-lg bg-background p-2'>
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
        </div> -->
        <!-- {#each module.labels as label}
          {@render label()}
        {/each} -->
      </CardContent>
    </Card>
  </div>
{/snippet}

{#if isMobile}
  <Drawer>
    <DrawerTrigger>
      <a href={`/${module.moduleId}`} draggable='false'>
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
      <a href={`/${module.moduleId}`} draggable='false'>
        {@render card()}
      </a>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        Edit
      </ContextMenuItem>
      <ContextMenuItem variant='destructive' onclick={() => moduleStore.disableModule(module.moduleId)}>
        Remove
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
{/if}
