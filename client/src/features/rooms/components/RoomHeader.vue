<script setup lang="ts">
import { ref, computed } from "vue";
import { useLeaveRoom } from "../services/useLeaveRoom";
import InviteUsersModal from "./InviteUsersModal.vue";

const props = defineProps<{
  roomId?: number | null;
  roomName?: string;
}>();

const { mutate: leaveRoom, isPending: leaving } = useLeaveRoom();
const showInviteModal = ref(false);

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
      <h1 class="text-[0.9375rem] font-bold text-highlighted m-0 truncate">{{ roomName || '...' }}</h1>
      <p class="text-xs text-dimmed m-0">Public channel</p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 ml-auto shrink-0">
      <UButton
        v-if="roomId"
        variant="soft"
        color="primary"
        icon="i-lucide-user-plus"
        size="sm"
        @click="showInviteModal = true">
        Invite
      </UButton>
      
      <UDropdownMenu v-if="roomId" :items="roomActions" :ui="{ content: 'w-44' }">
        <UButton variant="ghost" color="neutral" icon="i-lucide-ellipsis" size="sm" :loading="leaving"
          aria-label="Room options" />
      </UDropdownMenu>
    </div>

    <!-- Invite modal -->
    <InviteUsersModal v-if="roomId" v-model:open="showInviteModal" :room-id="roomId" />
  </div>
</template>
