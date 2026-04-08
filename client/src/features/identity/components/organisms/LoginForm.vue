<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import Button from '@atoms/Button.vue';
import FormField from '@molecules/FormField.vue';

interface Props {
  isLoading?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const emit = defineEmits<{
  submit: [data: { email: string; password: string }];
}>();

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .max(255, 'Email is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password is too long'),
  })
);

const { defineField, handleSubmit, errors } = useForm({
  validationSchema,
});

const [email] = defineField('email');
const [password] = defineField('password');

const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <FormField id="email" v-model="email" label="Email Address" type="email" placeholder="hello@mango.com"
        autocomplete="email" :error-message="errors.email" :disabled="props.isLoading" required />

      <FormField id="password" v-model="password" label="Password" type="password" placeholder="••••••••"
        autocomplete="current-password" :error-message="errors.password" :disabled="props.isLoading" required />
    </div>

    <div v-if="props.errorMessage" class="p-3 rounded-lg bg-secondary-50 border border-secondary-200">
      <p class="text-sm font-body text-secondary-700">{{ props.errorMessage }}</p>
    </div>

    <Button type="submit" variant="primary" size="lg" :loading="props.isLoading" :disabled="props.isLoading" full-width>
      Log In
    </Button>
  </form>
</template>
