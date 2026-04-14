<script setup lang="ts">
import { reactive } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { createRoomSchema } from "../schemas/create-room.schema";
import type { CreateRoomSchema } from "../schemas/create-room.schema";

defineProps<{ loading?: boolean }>();
const emit = defineEmits<{ submit: [data: CreateRoomSchema] }>();

const state = reactive<CreateRoomSchema>({ name: "" });

function onSubmit(event: FormSubmitEvent<CreateRoomSchema>) {
  emit("submit", event.data);
};
</script>

<template>
  <UForm :schema="createRoomSchema" :state="state" class="space-y-5" @submit="onSubmit">
    <UFormField name="name" label="Room name">
      <UInput v-model="state.name" type="text" placeholder="e.g. general, announcements…" icon="i-lucide-hash" size="lg"
        class="w-full" :disabled="loading" />
    </UFormField>

    <p class="text-xs text-dimmed m-0 -mt-2">
      Keep it short and lowercase. You can always rename it later.
    </p>

    <UButton type="submit" size="lg" class="w-full justify-center" icon="i-lucide-plus" :loading="loading">
      Create Room
    </UButton>
  </UForm>
</template>
