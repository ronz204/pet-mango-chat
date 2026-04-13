<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { useAuthLogin } from "../services/useAuthLogin";

import type { LoginSchema } from "../schemas/login.schema";

const { mutate, isPending } = useAuthLogin();
function handleSubmit(data: LoginSchema) {
  mutate(data);
};
</script>

<template>
  <main class="min-h-screen flex bg-background">
    <!-- ── Brand panel (desktop) ───────────────────── -->
    <aside class="hidden lg:flex flex-col justify-between w-[44%] p-12 text-white"
      style="background: linear-gradient(145deg, oklch(0.70 0.187 46) 0%, oklch(0.58 0.180 38) 100%);">

      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img src="@assets/imgs/mango.png" alt="Mango" class="w-10 h-10" />
        <span class="text-2xl font-bold tracking-tight">Mango</span>
      </div>

      <!-- Headline -->
      <div class="space-y-5">
        <h1 class="text-5xl font-bold leading-tight">
          Connect.<br />Collaborate.<br />Create.
        </h1>
        <p class="text-white/70 text-lg max-w-xs leading-relaxed">
          Your team's living canvas — where real conversations spark real ideas.
        </p>
      </div>

      <p class="text-white/40 text-sm">© 2026 Mango Chat</p>
    </aside>

    <!-- ── Form panel ──────────────────────────────── -->
    <section class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-md space-y-8">
        <!-- Mobile logo -->
        <div class="flex items-center gap-3 lg:hidden">
          <img src="@assets/imgs/mango.png" alt="Mango" class="w-9 h-9" />
          <span class="text-xl font-bold text-highlighted">Mango</span>
        </div>

        <!-- Heading -->
        <div class="space-y-1">
          <h2 class="text-3xl font-bold text-highlighted">Welcome back</h2>
          <p class="text-muted">Sign in to continue to your workspace.</p>
        </div>

        <!-- Form -->
        <LoginForm :loading="isPending" @submit="handleSubmit" />

        <!-- Register link -->
        <p class="text-center text-sm text-muted">
          Don't have an account?
          <RouterLink to="/register" class="text-primary font-medium hover:underline">
            Create one
          </RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>
