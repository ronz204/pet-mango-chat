<script setup lang="ts">
import { reactive, watch } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { updateProfileSchema } from "../schemas/update-profile.schema";
import type { UpdateProfileSchema } from "../schemas/update-profile.schema";

const props = defineProps<{
  currentName?: string;
  currentEmail?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{ submit: [data: UpdateProfileSchema] }>();

const state = reactive<UpdateProfileSchema>({
  name: props.currentName ?? "",
  email: props.currentEmail ?? "",
});

watch(
  () => [props.currentName, props.currentEmail],
  ([name, email]) => {
    state.name = name ?? "";
    state.email = email ?? "";
  },
);

function onSubmit(event: FormSubmitEvent<UpdateProfileSchema>) {
  const payload: UpdateProfileSchema = {};
  if (event.data.name && event.data.name !== props.currentName) payload.name = event.data.name;
  if (event.data.email && event.data.email !== props.currentEmail) payload.email = event.data.email;
  emit("submit", payload);
}
</script>

<template>
  <UForm :schema="updateProfileSchema" :state="state" class="space-y-5" @submit="onSubmit">
    <UFormField name="name" label="Display name">
      <UInput v-model="state.name" type="text" placeholder="Your name" icon="i-lucide-user" size="lg" class="w-full"
        :disabled="loading" />
    </UFormField>

    <UFormField name="email" label="Email address">
      <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="i-lucide-mail" size="lg"
        class="w-full" :disabled="loading" />
    </UFormField>

    <UButton type="submit" size="lg" class="w-full justify-center" :loading="loading">
      Save Changes
    </UButton>
  </UForm>
</template>
