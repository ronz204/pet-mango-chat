<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import type { SignInRequest } from "@schemas/signin.schema";
import SignInForm from "../components/organisms/SignInForm.vue";
import { IdentityProvider } from "@providers/identity/identity.provider";

const { mutate: signIn, isPending, isError, error } = useMutation({
  mutationFn: (data: SignInRequest) => IdentityProvider.signIn(data),
  onSuccess: ({ token }) => {
    console.log(token);
  },
});
</script>

<template>
  <div>
    <SignInForm @submit="signIn" />
    <p v-if="isPending">Signing in...</p>
    <p v-if="isError">{{ error?.message }}</p>
  </div>
</template>
