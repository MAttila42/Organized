<script lang='ts'>
  import type { ModuleCard } from '$lib/stores/modules.svelte'
  import { moduleStore } from '$lib/stores/modules.svelte'
  import { isMobile } from '$lib/utils'
  import { Button } from './ui/button'
  import * as Card from './ui/card'
  import * as ContextMenu from './ui/context-menu'
  import * as Drawer from './ui/drawer'

  const {
    module,
  }: {
    module: ModuleCard
  } = $props()

  type ButtonVariant = 'outline' | 'destructive'
  const actions: { name: string, variant: ButtonVariant, action: () => void }[] = [
    { name: 'Edit', variant: 'outline', action: () => {} },
    { name: 'Remove', variant: 'destructive', action: () => moduleStore.removeModuleCard(module.moduleId) },
  ]
</script>

{#snippet card()}
  <a href={`/module/${module.moduleId}`} draggable='false'>
    <div class='relative select-none'>
      <div class='absolute h-full w-0.35rem opacity-30 blur-md' style={`background-color: ${module.color}; shadow: 0 0 12px 4px ${module.color};`}></div>
      <Card.Root class='relative z-10 gap-1 b-l-0.35em b-background rounded-md bg-secondary px-3 py-3 pl-2' style={`border-left-color: ${module.color};`}>
        <Card.Header class='px-0'>
          <Card.Title class='w-max rounded-lg bg-background px-3 py-2'>
            {module.name}
          </Card.Title>
        </Card.Header>
        <Card.Content class='px-0'>
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
        </Card.Content>
      </Card.Root>
    </div>
  </a>
{/snippet}

{#if isMobile}
  <Drawer.Root>
    <Drawer.Trigger>
      {@render card()}
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Footer>
        <div class='w-full flex flex-col gap-8'>
          <div class='px-2'>
            {@render card()}
          </div>
          <Drawer.Close class='flex flex-col gap-2'>
            {#each actions as { name, variant, action }}
              <Button {variant} onclick={action}>
                {name}
              </Button>
            {/each}
          </Drawer.Close>
        </div>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{:else}
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      {@render card()}
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      {#each actions as { name, variant, action }}
        <ContextMenu.Item variant={variant === 'destructive' ? 'destructive' : undefined} onclick={action}>
          {name}
        </ContextMenu.Item>
      {/each}
    </ContextMenu.Content>
  </ContextMenu.Root>
{/if}
