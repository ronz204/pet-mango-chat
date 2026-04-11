<script setup lang="ts">
import mango from "@assets/imgs/mango.png";

import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";

import type { SignInRequest } from "@schemas/signin.schema";
import SignInForm from "../components/organisms/SignInForm.vue";

import { IdentityProvider } from "@providers/identity/identity.provider";
import { useSessionStore } from "@stores/session.store";

const router = useRouter();
const session = useSessionStore();

const { mutate: signIn, isPending, isError, error } = useMutation({
  mutationFn: (data: SignInRequest) => IdentityProvider.signIn(data),
  onSuccess: ({ token }) => {
    session.setToken(token);
    router.push("/");
  },
});
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12">
    <div class="mb-8 flex flex-col items-center gap-4">
      <div class="rounded-2xl bg-white p-5 shadow-sm">
        <img :src="mango" alt="Mango" class="mx-auto size-24" />
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p class="mt-1 text-sm text-gray-500">Sign in to continue to Mango</p>
      </div>
    </div>

    <div class="w-full max-w-md">
      <SignInForm :loading="isPending" @submit="signIn" />
      <p v-if="isError" class="mt-4 text-center text-sm text-red-500">
        {{ error?.message ?? "Something went wrong. Please try again." }}
      </p>
    </div>
  </div>
</template>
