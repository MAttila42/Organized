<script lang='ts'>
  import type { Snippet } from 'svelte'
  import * as Card from '$lib/components/ui/card'

  const {
    title,
    description,
    class: className = '',
    children,
  }: {
    title: string
    description?: string
    class?: string
    children?: Snippet<[]>
  } = $props()
</script>

<Card.Root class='gap-3 rounded-md bg-secondary p-3'>
  <Card.Header class='px-0'>
    <Card.Title class='w-max rounded-lg bg-background px-3 py-2'>
      {title}
    </Card.Title>
    <Card.Description class='px-1 text-muted'>
      {description}
    </Card.Description>
  </Card.Header>

  <Card.Content class={`px-0 ${className}`}>
    {@render children?.()}
  </Card.Content>
</Card.Root>
