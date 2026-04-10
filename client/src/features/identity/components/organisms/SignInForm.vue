<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignInSchema, type SignInRequest } from "@schemas/signin.schema";

const emit = defineEmits<{ submit: [data: SignInRequest] }>();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(SignInSchema),
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");

const onSubmit = handleSubmit((values) => emit("submit", values));
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>Email</label>
      <input v-model="email" type="email" placeholder="email@example.com" />
      <span v-if="emailError">{{ emailError }}</span>
    </div>
    <div>
      <label>Password</label>
      <input v-model="password" type="password" placeholder="password" />
      <span v-if="passwordError">{{ passwordError }}</span>
    </div>
    <button type="submit">Sign in</button>
  </form>
</template>
