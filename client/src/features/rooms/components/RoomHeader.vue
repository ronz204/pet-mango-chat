<script setup lang="ts">
import { computed } from "vue";
import { useLeaveRoom } from "../services/useLeaveRoom";

const props = defineProps<{
  roomId?: number | null;
  roomName?: string;
  loading?: boolean;
}>();

const { mutate: leaveRoom, isPending: leaving } = useLeaveRoom();

const roomActions = computed(() => [
  [
    {
      label: "Leave Room",
      icon: "i-lucide-log-out",
      color: "error" as const,
      onSelect: () => {
        if (props.roomId) leaveRoom(props.roomId);
      },
    },
  ],
]);
</script>

<template>
  <div class="flex items-center gap-3.5 px-6 h-16 border-b border-default shrink-0 bg-elevated">
    <!-- Room icon -->
    <div class="flex items-center justify-center size-9 rounded-xl shrink-0 shadow-sm"
      style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.15), oklch(0.65 0.180 21 / 0.10))">
      <UIcon name="i-lucide-hash" class="text-primary text-base" />
    </div>

    <!-- Title area -->
    <div class="flex flex-col justify-center overflow-hidden flex-1">
      <div v-if="loading" class="flex flex-col gap-1.5">
        <div class="h-4 w-36 rounded bg-accented animate-pulse" />
        <div class="h-3 w-20 rounded bg-accented/60 animate-pulse" />
      </div>
      <template v-else>
        <h1 class="text-[0.9375rem] font-bold text-highlighted m-0 truncate">{{ roomName }}</h1>
        <p class="text-xs text-dimmed m-0">Public channel</p>
      </template>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 ml-auto shrink-0">
      <UDropdownMenu v-if="roomId" :items="roomActions" :ui="{ content: 'w-44' }">
        <UButton variant="ghost" color="neutral" icon="i-lucide-ellipsis" size="sm" :loading="leaving"
          aria-label="Room options" />
      </UDropdownMenu>
    </div>
  </div>
</template>
