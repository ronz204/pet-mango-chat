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
  <nav class="flex items-center gap-6 h-full px-6">
    <!-- Brand -->
    <RouterLink to="/rooms" class="flex items-center gap-2.5 no-underline shrink-0 group">
      <img src="@assets/imgs/mango.png" alt="Mango" class="w-7.5 h-7.5 transition-transform duration-200 group-hover:scale-105" />
      <span class="text-lg font-bold text-primary -tracking-tight">Mango</span>
    </RouterLink>

    <!-- Divider -->
    <div class="w-px h-5 bg-accented shrink-0" />

    <!-- Nav links -->
    <ul class="flex items-center gap-0.5 list-none m-0 p-0 flex-1">
      <li v-for="link in navLinks" :key="link.to">
        <RouterLink
          :to="link.to"
          class="px-3.5 py-1.5 rounded-lg text-sm font-medium text-muted no-underline transition-all duration-150 hover:bg-accented hover:text-default"
          active-class="!bg-[oklch(0.70_0.187_46/0.10)] !text-primary !font-semibold">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>

    <!-- Profile -->
    <div class="flex items-center gap-3 ml-auto">
      <span v-if="profile?.name" class="text-sm text-muted hidden xl:block truncate max-w-32">
        {{ profile.name.split(' ')[0] }}
      </span>
      <UDropdownMenu :items="profileItems" :ui="{ content: 'w-52' }">
        <button
          class="size-9 rounded-full flex items-center justify-center border-2 border-transparent hover:border-[oklch(0.70_0.187_46/0.35)] cursor-pointer transition-all duration-150 shadow-sm"
          :style="{ background: 'linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))' }"
          :aria-label="profile?.name ?? 'Profile menu'">
          <span class="text-xs font-bold text-white tracking-wide select-none">{{ initials }}</span>
        </button>
      </UDropdownMenu>
    </div>
  </nav>
</template>
