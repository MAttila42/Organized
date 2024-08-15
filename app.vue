<script setup lang="ts">
import { migrate } from 'db/migrate'

onMounted(async () => {
  await migrate()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
