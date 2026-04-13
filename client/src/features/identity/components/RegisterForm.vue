<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";

import { registerSchema } from "../schemas/register.schema";
import type { RegisterSchema, RegisterPayload } from "../schemas/register.schema";

defineProps<{ loading?: boolean }>();
const emit = defineEmits<{ submit: [data: RegisterPayload] }>();

const state = reactive<RegisterSchema>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const showPassword = ref(false);
const showConfirm = ref(false);

function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
  const { confirmPassword: _, ...payload } = event.data;
  emit("submit", payload);
};
</script>

<template>
  <UForm :schema="registerSchema" :state="state" class="space-y-5" @submit="onSubmit">
    <UFormField name="name" label="Full name">
      <UInput v-model="state.name" type="text" placeholder="Jordan Rivera" icon="i-lucide-user" size="lg" class="w-full"
        :disabled="loading" />
    </UFormField>

    <UFormField name="email" label="Email address">
      <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="i-lucide-mail" size="lg"
        class="w-full" :disabled="loading" />
    </UFormField>

    <UFormField name="password" label="Password">
      <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
        icon="i-lucide-lock" size="lg" class="w-full" :disabled="loading" :ui="{ trailing: 'pe-1' }">
        <template #trailing>
          <UButton color="neutral" variant="link" size="sm" :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword" />
        </template>
      </UInput>
    </UFormField>

    <UFormField name="confirmPassword" label="Confirm password">
      <UInput v-model="state.confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="••••••••"
        icon="i-lucide-lock-keyhole" size="lg" class="w-full" :disabled="loading" :ui="{ trailing: 'pe-1' }">
        <template #trailing>
          <UButton color="neutral" variant="link" size="sm" :icon="showConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showConfirm ? 'Hide password' : 'Show password'" @click="showConfirm = !showConfirm" />
        </template>
      </UInput>
    </UFormField>

    <UButton type="submit" size="lg" class="w-full justify-center mt-2" :loading="loading">
      Create account
    </UButton>
  </UForm>
</template>
