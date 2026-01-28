<script lang='ts'>
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { t } from '$lib/i18n.svelte'
  import * as api from '../api'
  import { shopping } from '../store.svelte'

  let {
    open = $bindable(false),
  }: {
    open?: boolean
  } = $props()

  const currentMembership = $derived(shopping.shared.currentMembership)
  const currentListId = $derived(shopping.shared.currentListId)
  const isOwner = $derived(shopping.shared.isOwner)

  // Invites state
  let invites = $state<api.InviteData[]>([])
  let invitesLoading = $state(false)
  let invitesError = $state('')

  // Leave/delete state
  let confirmLeaveOpen = $state(false)
  let leaveLoading = $state(false)

  // Load invites when dialog opens
  $effect(() => {
    if (open && isOwner && currentListId)
      loadInvites()
  })

  async function loadInvites() {
    if (!currentListId)
      return

    invitesLoading = true
    invitesError = ''
    try {
      invites = await api.getListInvites(currentListId)
    }
    catch (error) {
      invitesError = error instanceof Error ? error.message : 'Failed to load invites'
    }
    finally {
      invitesLoading = false
    }
  }

  async function createInvite() {
    if (!currentListId)
      return

    invitesLoading = true
    invitesError = ''
    try {
      const invite = await api.createInvite(currentListId)
      invites = [...invites, invite]
    }
    catch (error) {
      invitesError = error instanceof Error ? error.message : 'Failed to create invite'
    }
    finally {
      invitesLoading = false
    }
  }

  async function deleteInvite(inviteId: string) {
    invitesLoading = true
    try {
      await api.deleteInvite(inviteId)
      invites = invites.filter(i => i.id !== inviteId)
    }
    catch (error) {
      invitesError = error instanceof Error ? error.message : 'Failed to delete invite'
    }
    finally {
      invitesLoading = false
    }
  }

  async function copyInviteCode(code: string) {
    try {
      await navigator.clipboard.writeText(code)
    }
    catch {
    // Fallback - just ignore
    }
  }

  async function handleLeave() {
    if (!currentListId)
      return

    leaveLoading = true
    try {
      if (isOwner) {
        // Owners can delete the local reference (server list remains)
        await shopping.shared.deleteLocalMembership(currentListId)
      }
      else {
        await shopping.shared.leaveList(currentListId)
      }
      shopping.useLocal()
      confirmLeaveOpen = false
      open = false
    }
    finally {
      leaveLoading = false
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class='sm:max-w-md'>
    <Dialog.Header>
      <Dialog.Title>{t('shopping.settings.title', 'List settings')}</Dialog.Title>
      {#if currentMembership}
        <Dialog.Description>{currentMembership.name}</Dialog.Description>
      {/if}
    </Dialog.Header>

    <div class='flex flex-col gap-6'>
      <!-- Sharing section (owner only) -->
      {#if isOwner}
        <div class='flex flex-col gap-3'>
          <div class='flex items-center justify-between'>
            <span class='text-sm font-medium'>{t('shopping.settings.sharing', 'Sharing')}</span>
            <Button variant='outline' size='sm' onclick={createInvite} disabled={invitesLoading}>
              <span class='i-fluent:add-12-filled mr-1 size-3'></span>
              {t('shopping.settings.createInvite', 'New invite')}
            </Button>
          </div>

          {#if invitesError}
            <p class='text-sm text-destructive'>{invitesError}</p>
          {/if}

          {#if invites.length === 0}
            <div class='flex flex-col items-center gap-2 border rounded-md border-dashed px-4 py-6 text-center text-muted'>
              <span class='i-fluent:share-20-regular size-6'></span>
              <p class='text-sm'>{t('shopping.settings.noInvites', 'No invite codes')}</p>
              <p class='text-xs'>{t('shopping.settings.noInvitesDescription', 'Create an invite code to share this list')}</p>
            </div>
          {:else}
            <div class='flex flex-col gap-2'>
              {#each invites as invite (invite.id)}
                <div class='flex items-center justify-between gap-2 border rounded-md px-3 py-2'>
                  <div class='flex flex-col'>
                    <span class='text-sm font-medium tracking-wider font-mono'>{invite.code}</span>
                    <span class='text-xs text-muted'>
                      {t('shopping.settings.inviteUsed', 'Used {count} times', { count: invite.usedCount })}
                    </span>
                  </div>
                  <div class='flex items-center gap-1'>
                    <Button variant='ghost' size='sm' class='h-7 px-2' onclick={() => copyInviteCode(invite.code)}>
                      <span class='i-fluent:copy-16-regular size-4'></span>
                    </Button>
                    <Button variant='ghost' size='sm' class='h-7 px-2 text-destructive hover:text-destructive' onclick={() => deleteInvite(invite.id)}>
                      <span class='i-fluent:delete-16-regular size-4'></span>
                    </Button>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Danger zone -->
      <div class='flex flex-col gap-3'>
        <span class='text-sm text-destructive font-medium'>{t('shopping.settings.dangerZone', 'Danger zone')}</span>

        <Dialog.Root bind:open={confirmLeaveOpen}>
          <Dialog.Trigger class='w-full'>
            <Button variant='outline' class='w-full border-destructive/30 text-destructive hover:bg-destructive/10'>
              <span class='i-fluent:sign-out-20-regular mr-1 size-4'></span>
              {isOwner
                ? t('shopping.settings.removeList', 'Remove from device')
                : t('shopping.settings.leaveList', 'Leave list')}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content class='sm:max-w-sm'>
            <Dialog.Header>
              <Dialog.Title>
                {isOwner
                  ? t('shopping.settings.removeConfirmTitle', 'Remove list?')
                  : t('shopping.settings.leaveConfirmTitle', 'Leave list?')}
              </Dialog.Title>
              <Dialog.Description>
                {isOwner
                  ? t('shopping.settings.removeConfirmDescription', 'This will remove the list from this device. The list will still exist on the server.')
                  : t('shopping.settings.leaveConfirmDescription', 'You will no longer have access to this list. You\'ll need a new invite code to rejoin.')}
              </Dialog.Description>
            </Dialog.Header>
            <div class='mt-4 flex gap-2'>
              <Dialog.Close class='flex-1'>
                <Button variant='outline' class='w-full'>{t('cancel', 'Cancel')}</Button>
              </Dialog.Close>
              <Button variant='destructive' class='flex-1' onclick={handleLeave} disabled={leaveLoading}>
                {leaveLoading ? t('loading', 'Loading...') : isOwner ? t('remove', 'Remove') : t('leave', 'Leave')}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
