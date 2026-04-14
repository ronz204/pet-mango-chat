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
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 pt-4 pb-3">
      <span class="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dimmed">Rooms</span>
      <RouterLink to="/rooms/create">
        <UButton size="xs" variant="ghost" icon="i-lucide-plus" aria-label="Create room"
          class="text-dimmed hover:text-primary" />
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="isPending" class="flex flex-col gap-1.5 px-3">
      <div v-for="i in 4" :key="i" class="h-9 rounded-lg bg-accented animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="flex flex-col items-center justify-center gap-2 py-10 px-4 text-error text-xs">
      <UIcon name="i-lucide-wifi-off" class="text-xl" />
      <span>Could not load rooms</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!rooms?.length" class="flex flex-col items-center justify-center gap-3 py-12 px-5">
      <div
        class="size-12 rounded-2xl flex items-center justify-center"
        style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
        <UIcon name="i-lucide-hash" class="text-xl text-primary/40" />
      </div>
      <div class="text-center">
        <p class="text-xs font-semibold text-muted m-0">No rooms yet</p>
        <p class="text-xs text-dimmed m-0 mt-0.5">Create one to get started</p>
      </div>
      <RouterLink to="/rooms/create">
        <UButton size="xs" variant="soft" icon="i-lucide-plus">New Room</UButton>
      </RouterLink>
    </div>

    <!-- List -->
    <ul v-else class="list-none m-0 p-0 flex flex-col gap-px px-2 flex-1 overflow-y-auto">
      <li v-for="room in rooms" :key="room.id">
        <button
          class="group flex items-center gap-2 w-full px-3 py-2.5 rounded-lg border-0 cursor-pointer text-left transition-all duration-150"
          :class="activeRoomId === room.id
            ? 'bg-[oklch(0.70_0.187_46/0.12)] text-primary font-semibold'
            : 'bg-transparent text-muted hover:bg-accented hover:text-default'"
          @click="openRoom(room.id)">
          <span
            class="text-sm font-bold shrink-0 transition-all duration-150"
            :class="activeRoomId === room.id ? 'text-primary' : 'text-dimmed group-hover:text-muted'">#</span>
          <span class="text-[0.8375rem] overflow-hidden text-ellipsis whitespace-nowrap flex-1">{{ room.name }}</span>
          <span
            v-if="activeRoomId === room.id"
            class="size-1.5 rounded-full shrink-0"
            style="background: oklch(0.70 0.187 46)" />
        </button>
      </li>
    </ul>
  </div>
</template>
