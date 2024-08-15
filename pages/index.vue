<script setup lang="ts">
import { db } from 'db'
import { test } from 'db/schema'

const records = ref()

async function testInsert() {
  await db.insert(test).values({
    test: Date.now().toString(),
  })
  records.value = await db.query.test.findMany()
}

async function purge() {
  await db.delete(test).all()
  records.value = await db.query.test.findMany()
}

onMounted(async () => {
  records.value = await db.query.test.findMany()
})
</script>

<template>
  <div class="m-5 flex flex-col gap-5">
    <div class="flex gap-2">
      <Button class="w-max" @click="testInsert">
        Add record
      </Button>
      <Button class="w-max" @click="purge">
        Purge
      </Button>
    </div>
    <p
      v-for="record of records"
      :key="record.id"
    >
      {{ record }}
    </p>
  </div>
</template>
