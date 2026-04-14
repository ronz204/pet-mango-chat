<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import MangoLayout from "@layouts/MangoLayout.vue";
import RoomsNavbar from "../components/RoomsNavbar.vue";
import RoomsSidebar from "../components/RoomsSidebar.vue";
import MembersSidebar from "../components/MembersSidebar.vue";
import RoomHeader from "../components/RoomHeader.vue";
import { useGetRoomDetails } from "../services/useGetRoomDetails";

const route = useRoute();

const roomId = computed(() => {
  const id = route.params.roomId;
  return id ? Number(id) : null;
});

const { data: room, isPending: loadingRoom } = useGetRoomDetails(roomId);
</script>

<template>
  <MangoLayout>
    <!-- Navbar -->
    <template #navbar>
      <RoomsNavbar />
    </template>

    <!-- Left sidebar: rooms list -->
    <template #sidebar>
      <RoomsSidebar />
    </template>

    <!-- Main: room content -->
    <template #default>
      <template v-if="roomId">
        <!-- Room header -->
        <RoomHeader :room-name="room?.name" :loading="loadingRoom" />

        <!-- Messages area (coming soon) -->
        <div class="flex-1 overflow-y-auto flex items-center justify-center">
          <div class="flex flex-col items-center gap-5 p-8 text-center max-w-sm">
            <div
              class="size-16 rounded-2xl flex items-center justify-center shadow-sm"
              style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
              <UIcon name="i-lucide-message-square-dashed" class="text-3xl text-primary/50" />
            </div>
            <div class="space-y-2">
              <h3 class="text-base font-bold text-highlighted m-0">Messages coming soon</h3>
              <p class="text-sm text-muted leading-relaxed m-0">
                The messaging engine is on its way.<br />Hang tight — conversations are almost here.
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- No room selected -->
      <div v-else class="flex flex-col items-center justify-center gap-6 flex-1 p-8 text-center">
        <div class="relative">
          <div
            class="size-20 rounded-3xl flex items-center justify-center shadow-md"
            style="background: linear-gradient(145deg, oklch(0.70 0.187 46 / 0.14), oklch(0.65 0.180 21 / 0.10))">
            <UIcon name="i-lucide-hash" class="text-4xl" style="color: oklch(0.70 0.187 46 / 0.5)" />
          </div>
          <div
            class="absolute -top-1.5 -right-1.5 size-5 rounded-full border-2 border-background shadow-sm"
            style="background: linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))" />
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-highlighted m-0">Welcome to Mango</h3>
          <p class="text-sm text-muted max-w-60 leading-relaxed m-0">
            Pick a room from the sidebar to start chatting with your team.
          </p>
        </div>
        <RouterLink to="/rooms/create">
          <UButton variant="soft" icon="i-lucide-plus" size="md">
            Create Room
          </UButton>
        </RouterLink>
      </div>
    </template>

    <!-- Right sidebar: members -->
    <template #members>
      <MembersSidebar :room-id="roomId" />
    </template>
  </MangoLayout>
</template>
