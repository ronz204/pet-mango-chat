<script setup lang="ts">
import Field from "@atoms/Field.vue";
import Button from "@atoms/Button.vue";
import { Mail, Lock } from "@lucide/vue";

import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { SignInSchema } from "@schemas/signin.schema";
import type { SignInRequest } from "@schemas/signin.schema";

interface Props {
  loading?: boolean;
};

withDefaults(defineProps<Props>(), { loading: false });

const emit = defineEmits<{ submit: [data: SignInRequest] }>();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(SignInSchema),
  initialValues: { email: "", password: "" },
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");

const onSubmit = handleSubmit((values) => emit("submit", values));
</script>

<template>
  <div class="rounded-lg bg-white shadow-lg">
    <div class="space-y-1 px-6 pb-4 pt-6 text-center">
      <h2 class="text-xl font-semibold text-gray-900">Sign In</h2>
      <p class="text-sm text-gray-500">Enter your credentials to access your account</p>
    </div>

    <form class="space-y-4 px-6 py-4" @submit.prevent="onSubmit">
      <Field v-model="email" label="Email" type="email" placeholder="you@example.com" :error="emailError">
        <template #icon>
          <Mail :size="16" />
        </template>
      </Field>

      <Field v-model="password" label="Password" type="password" placeholder="Enter your password"
        :error="passwordError">
        <template #icon>
          <Lock :size="16" />
        </template>
        <template #labelRight>
          <a href="#" class="text-sm text-brand-500 hover:underline">
            Forgot password?
          </a>
        </template>
      </Field>

      <Button type="submit" :loading="loading" :full-width="true" class="mt-2">
        Sign In
      </Button>
    </form>

    <div class="px-6 pb-6 pt-2 text-center">
      <p class="text-sm text-gray-500">
        Don't have an account?
        <RouterLink to="/sign-up" class="font-medium text-brand-500 hover:underline">
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>
