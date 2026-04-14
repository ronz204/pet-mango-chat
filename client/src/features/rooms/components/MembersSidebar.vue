<script setup lang="ts">
import { useGetRoomMembers, type MemberRole } from "../services/useGetRoomMembers";

const props = defineProps<{
  roomId: number | null;
}>();

const { data: members, isPending, isError } = useGetRoomMembers(() => props.roomId);

const roleLabel: Record<MemberRole, string> = {
  ADMIN: "Admin",
  USER: "Member",
};

const roleColor: Record<MemberRole, string> = {
  ADMIN: "oklch(0.65 0.180 21)",
  USER: "oklch(0.52 0.014 80)",
};

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
};
</script>

<template>
  <div class="flex flex-col h-full py-3 px-2">
    <!-- Header -->
    <div class="px-2 pb-2">
      <span class="text-xs font-bold uppercase tracking-widest text-muted">Members</span>
    </div>

    <!-- No room selected -->
    <div v-if="!roomId" class="flex flex-col items-center justify-center gap-2 flex-1 py-8 px-4 text-dimmed text-xs">
      <UIcon name="i-lucide-users" class="text-2xl opacity-25" />
      <span>Select a room</span>
    </div>

    <!-- Loading -->
    <div v-else-if="isPending" class="flex flex-col gap-1 px-1 pt-1">
      <div v-for="i in 4" :key="i" class="h-9 rounded bg-accented animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="isError"
      class="flex flex-col items-center justify-center gap-2 flex-1 py-8 px-4 text-error text-xs">
      <UIcon name="i-lucide-wifi-off" class="text-xl" />
      <span>Could not load members</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!members?.length"
      class="flex flex-col items-center justify-center gap-2 flex-1 py-8 px-4 text-dimmed text-xs">
      <UIcon name="i-lucide-users" class="text-2xl opacity-25" />
      <span>No members yet</span>
    </div>

    <!-- Member list -->
    <ul v-else class="list-none m-0 p-0 flex flex-col gap-0.5">
      <li v-for="member in members" :key="member.id"
        class="flex items-center gap-2.5 px-2 py-1.5 rounded transition-colors duration-120 hover:bg-accented">
        <!-- Avatar -->
        <div
          class="size-7.5 shrink-0 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-primary"
          style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.3), oklch(0.65 0.180 21 / 0.3))">
          <span>{{ initials(member.userName) }}</span>
        </div>

        <!-- Info -->
        <div class="flex flex-col overflow-hidden">
          <span class="text-[0.8rem] font-medium text-default whitespace-nowrap overflow-hidden text-ellipsis">{{
            member.userName }}</span>
          <span class="text-[0.7rem] font-medium" :style="{ color: roleColor[member.role] }">
            {{ roleLabel[member.role] }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
