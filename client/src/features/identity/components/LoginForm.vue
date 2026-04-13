<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";

import { loginSchema } from "../schemas/login.schema";
import type { LoginSchema } from "../schemas/login.schema";

defineProps<{ loading?: boolean }>();
const emit = defineEmits<{ submit: [data: LoginSchema] }>();

const state = reactive<LoginSchema>({ email: "", password: "" });
const showPassword = ref(false);

function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  emit("submit", event.data);
};
</script>

<template>
  <UForm :schema="loginSchema" :state="state" class="space-y-5" @submit="onSubmit">
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

    <UButton type="submit" size="lg" class="w-full justify-center mt-2" :loading="loading">
      Sign in
    </UButton>
  </UForm>
</template>
