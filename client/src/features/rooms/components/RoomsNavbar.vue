<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@stores/auth.store";
import { useGetProfile } from "@features/identity/services/useGetProfile";

const router = useRouter();
const authStore = useAuthStore();
const { data: profile } = useGetProfile();

const initials = computed(() => {
  if (!profile.value?.name) return "?";
  return profile.value.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
});

const navLinks = [
  { label: "Rooms", to: "/rooms" },
  { label: "Invitations", to: "/invitations" },
];

const profileItems = computed(() => [
  [
    {
      label: profile.value?.name ?? "Profile",
      slot: "header",
      disabled: true,
    },
  ],
  [
    {
      label: "My Profile",
      icon: "i-lucide-user",
      to: "/profile",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/settings",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-lucide-log-out",
      color: "error" as const,
      onSelect: () => {
        authStore.dropAuthToken();
        router.push("/login");
      },
    },
  ],
]);
</script>

<template>
  <nav class="flex items-center gap-8 h-full px-5">
    <!-- Brand -->
    <RouterLink to="/rooms" class="flex items-center gap-2 no-underline shrink-0">
      <img src="@assets/imgs/mango.png" alt="Mango" class="w-7 h-7" />
      <span class="text-lg font-bold text-primary -tracking-tight">Mango</span>
    </RouterLink>

    <!-- Nav links -->
    <ul class="flex items-center gap-1 list-none m-0 p-0 flex-1">
      <li v-for="link in navLinks" :key="link.to">
        <RouterLink :to="link.to"
          class="px-3 py-1.5 rounded text-sm font-medium text-muted no-underline transition-colors duration-150 hover:bg-accented hover:text-default"
          active-class="!text-highlighted font-semibold">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>

    <!-- Actions -->
    <div class="flex items-center gap-2 ml-auto">
      <UDropdownMenu :items="profileItems" :ui="{ content: 'w-52' }">
        <button
          class="size-8.5 rounded-full flex items-center justify-center border-0 cursor-pointer transition-opacity duration-150 hover:opacity-85"
          :style="{ background: 'linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))' }"
          :aria-label="profile?.name ?? 'Profile menu'">
          <span class="text-xs font-bold text-white tracking-wide select-none">{{ initials }}</span>
        </button>
      </UDropdownMenu>
    </div>
  </nav>
</template>
