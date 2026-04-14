<script setup lang="ts">
import { useRouter } from "vue-router";
import MangoLayout from "@layouts/MangoLayout.vue";
import RoomsNavbar from "../components/RoomsNavbar.vue";
import RoomsSidebar from "../components/RoomsSidebar.vue";
import CreateRoomForm from "../components/CreateRoomForm.vue";
import { useCreateRoom } from "../services/useCreateRoom";
import type { CreateRoomSchema } from "../schemas/create-room.schema";

const router = useRouter();
const { mutate, isPending, isError } = useCreateRoom();

function handleSubmit(data: CreateRoomSchema) {
  mutate(data);
}
</script>

<template>
  <MangoLayout>
    <template #navbar>
      <RoomsNavbar />
    </template>

    <template #sidebar>
      <RoomsSidebar />
    </template>

    <template #default>
      <div class="flex-1 overflow-y-auto flex items-start justify-center pt-16 px-6">
        <div class="w-full max-w-md space-y-8">

          <!-- Header -->
          <div class="flex items-center gap-3">
            <button
              class="flex items-center justify-center size-8 rounded-lg text-muted hover:bg-accented hover:text-default transition-colors duration-150"
              @click="router.back()">
              <UIcon name="i-lucide-arrow-left" class="text-base" />
            </button>
            <div>
              <h1 class="text-2xl font-bold text-highlighted m-0">Create a Room</h1>
              <p class="text-sm text-muted m-0 mt-0.5">A room is where conversations happen.</p>
            </div>
          </div>

          <!-- Card -->
          <div class="rounded-2xl border border-default bg-elevated p-7 shadow-xs space-y-6">
            <!-- Icon -->
            <div class="size-14 rounded-2xl flex items-center justify-center shadow-sm"
              style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.14), oklch(0.65 0.180 21 / 0.10))">
              <UIcon name="i-lucide-hash" class="text-2xl" style="color: oklch(0.70 0.187 46 / 0.7)" />
            </div>

            <!-- Error feedback -->
            <UAlert v-if="isError" color="error" variant="soft" icon="i-lucide-alert-circle"
              title="Could not create room" description="Something went wrong. Please try again." />

            <CreateRoomForm :loading="isPending" @submit="handleSubmit" />
          </div>

        </div>
      </div>
    </template>
  </MangoLayout>
</template>
