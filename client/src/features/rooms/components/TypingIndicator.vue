<script setup lang="ts">
import { computed } from "vue";
import type { RoomMember } from "../services/useGetRoomMembers";

const props = defineProps<{
  typingUserIds: number[];
  members?: RoomMember[];
  currentUserId?: number;
}>();

const typingUsers = computed(() => {
  if (!props.members) return [];

  return props.typingUserIds
    .filter((id) => id !== props.currentUserId)
    .map((id) => props.members?.find((m) => m.userId === id))
    .filter(Boolean)
    .slice(0, 3);
});

const typingText = computed(() => {
  const count = typingUsers.value.length;
  if (count === 0) return "";
  if (count === 1) return `${typingUsers.value[0]?.userName} is typing`;
  if (count === 2) return `${typingUsers.value[0]?.userName} and ${typingUsers.value[1]?.userName} are typing`;
  return `${typingUsers.value[0]?.userName}, ${typingUsers.value[1]?.userName}, and ${count - 2} other${count - 2 > 1 ? 's' : ''} are typing`;
});
</script>

<template>
  <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-150"
    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
    <div v-if="typingUsers.length > 0" class="px-6 pb-2.5 shrink-0">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-elevated border border-default shadow-sm">
        <div class="flex items-center gap-0.5">
          <div v-for="i in 3" :key="i" class="size-1.5 rounded-full animate-bounce" :class="[
            i === 1 ? 'bg-[oklch(0.70_0.187_46)]' : '',
            i === 2 ? 'bg-[oklch(0.68_0.180_35)]' : '',
            i === 3 ? 'bg-[oklch(0.65_0.175_25)]' : ''
          ]" :style="{ animationDelay: `${i * 150}ms` }" />
        </div>
        <span class="text-xs font-medium" style="color: oklch(0.55 0.02 264)">
          {{ typingText }}
        </span>
      </div>
    </div>
  </Transition>
</template>
