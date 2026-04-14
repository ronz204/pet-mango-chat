<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import MangoLayout from "@layouts/MangoLayout.vue";
import RoomsNavbar from "@features/rooms/components/RoomsNavbar.vue";
import ProfileForm from "../components/ProfileForm.vue";
import { useGetProfile } from "../services/useGetProfile";
import { useUpdateProfile } from "../services/useUpdateProfile";
import type { UpdateProfileSchema } from "../schemas/update-profile.schema";

const router = useRouter();
const { data: profile, isPending: loadingProfile } = useGetProfile();
const { mutate, isPending: saving, isSuccess, isError } = useUpdateProfile();

const initials = computed(() => {
  if (!profile.value?.name) return "?";
  return profile.value.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
});

function handleSubmit(data: UpdateProfileSchema) {
  mutate(data);
}
</script>

<template>
  <MangoLayout>
    <template #navbar>
      <RoomsNavbar />
    </template>

    <template #default>
      <div class="flex-1 overflow-y-auto">
        <!-- Page header -->
        <div class="border-b border-default bg-elevated px-8 py-5">
          <div class="max-w-2xl mx-auto flex items-center gap-4">
            <button
              class="flex items-center justify-center size-8 rounded-lg text-muted hover:bg-accented hover:text-default transition-colors duration-150"
              @click="router.back()">
              <UIcon name="i-lucide-arrow-left" class="text-base" />
            </button>
            <div>
              <h1 class="text-lg font-bold text-highlighted m-0">My Profile</h1>
              <p class="text-xs text-dimmed m-0">Manage your personal information</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="max-w-2xl mx-auto px-8 py-10 space-y-8">

          <!-- Avatar card -->
          <div class="rounded-2xl border border-default bg-elevated p-6 flex items-center gap-5 shadow-xs">
            <!-- Avatar -->
            <div
              class="size-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0"
              style="background: linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))">
              <template v-if="loadingProfile">
                <div class="size-full rounded-2xl bg-white/20 animate-pulse" />
              </template>
              <span v-else>{{ initials }}</span>
            </div>

            <!-- Info -->
            <div class="flex flex-col gap-1 overflow-hidden">
              <template v-if="loadingProfile">
                <div class="h-5 w-32 rounded bg-accented animate-pulse" />
                <div class="h-3.5 w-44 rounded bg-accented/60 animate-pulse mt-1" />
              </template>
              <template v-else>
                <h2 class="text-xl font-bold text-highlighted m-0 truncate">{{ profile?.name }}</h2>
                <p class="text-sm text-muted m-0 truncate">{{ profile?.email }}</p>
              </template>
            </div>
          </div>

          <!-- Edit form card -->
          <div class="rounded-2xl border border-default bg-elevated p-6 shadow-xs">
            <div class="mb-6">
              <h3 class="text-base font-bold text-highlighted m-0">Basic Information</h3>
              <p class="text-xs text-dimmed m-0 mt-1">Update your name and email address.</p>
            </div>

            <!-- Success / error feedback -->
            <UAlert
              v-if="isSuccess"
              color="success"
              variant="soft"
              icon="i-lucide-check-circle"
              title="Profile updated"
              description="Your information has been saved successfully."
              class="mb-5"
            />
            <UAlert
              v-if="isError"
              color="error"
              variant="soft"
              icon="i-lucide-alert-circle"
              title="Something went wrong"
              description="Could not update your profile. Please try again."
              class="mb-5"
            />

            <ProfileForm
              :current-name="profile?.name"
              :current-email="profile?.email"
              :loading="saving || loadingProfile"
              @submit="handleSubmit"
            />
          </div>

        </div>
      </div>
    </template>
  </MangoLayout>
</template>
