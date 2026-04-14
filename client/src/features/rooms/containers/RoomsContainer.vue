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
          <div class="flex flex-col items-center gap-3 p-8 text-center max-w-xs">
            <div
              class="size-14 rounded-full bg-[oklch(0.70_0.187_46/0.10)] flex items-center justify-center text-2xl text-primary">
              <UIcon name="i-lucide-message-square-dashed" />
            </div>
            <h3 class="text-base font-semibold text-highlighted m-0">Messages coming soon</h3>
            <p class="text-sm text-muted leading-relaxed m-0">
              The messaging engine is still being built.
              <br />Hang tight — conversations are on their way.
            </p>
          </div>
        </div>
      </template>

      <!-- No room selected -->
      <div v-else class="flex flex-col items-center justify-center gap-3 flex-1 p-8 text-center">
        <div class="size-16 rounded-full bg-accented flex items-center justify-center text-[1.75rem] text-dimmed">
          <UIcon name="i-lucide-hash" />
        </div>
        <h3 class="text-lg font-semibold text-highlighted m-0">Pick a room</h3>
        <p class="text-sm text-muted max-w-65 leading-relaxed m-0">
          Select a room from the sidebar or create a new one.
        </p>
        <RouterLink to="/rooms/create">
          <UButton variant="soft" icon="i-lucide-plus">
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
