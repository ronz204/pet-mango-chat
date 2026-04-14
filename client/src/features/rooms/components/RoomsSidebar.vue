<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGetMyRooms } from "../services/useGetMyRooms";

const router = useRouter();
const route = useRoute();
const { data: rooms, isPending, isError } = useGetMyRooms();

const activeRoomId = computed(() => {
  const id = route.params.roomId;
  return id ? Number(id) : null;
});

function openRoom(id: number) {
  router.push(`/rooms/${id}`);
};
</script>

<template>
  <div class="flex flex-col h-full py-3 px-2 gap-1">
    <!-- Header -->
    <div class="flex items-center justify-between px-2 pb-2">
      <span class="text-xs font-bold uppercase tracking-widest text-muted">Rooms</span>
      <RouterLink to="/rooms/create">
        <UButton size="xs" variant="soft" icon="i-lucide-plus" aria-label="Create room" />
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="isPending" class="flex flex-col gap-1 px-1">
      <div v-for="i in 4" :key="i" class="h-8 rounded bg-accented animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="flex flex-col items-center justify-center gap-2 py-8 px-4 text-error text-xs">
      <UIcon name="i-lucide-wifi-off" class="text-xl" />
      <span>Could not load rooms</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!rooms?.length"
      class="flex flex-col items-center justify-center gap-2 py-8 px-4 text-dimmed text-xs">
      <UIcon name="i-lucide-hash" class="text-2xl opacity-30" />
      <p class="text-center leading-relaxed m-0">No rooms yet.<br />Create one to get started.</p>
    </div>

    <!-- List -->
    <ul v-else class="list-none m-0 p-0 flex flex-col gap-0.5">
      <li v-for="room in rooms" :key="room.id">
        <button
          class="flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded border-0 cursor-pointer text-left transition-colors duration-120 hover:bg-accented hover:text-default"
          :class="activeRoomId === room.id
            ? 'bg-[oklch(0.70_0.187_46/0.12)] text-primary font-semibold'
            : 'bg-transparent text-muted'" @click="openRoom(room.id)">
          <span class="text-sm opacity-50 shrink-0">#</span>
          <span class="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{{ room.name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
