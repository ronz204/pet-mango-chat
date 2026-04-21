<script setup lang="ts">
import { computed } from "vue";
import { useGetRoomMembers } from "../services/useGetRoomMembers";

const props = defineProps<{
  roomId: number | null;
  onlineUserIds: Set<number>;
}>();

const { data: members, isPending, isError } = useGetRoomMembers(computed(() => props.roomId));

const admins = computed(() => members.value?.filter((m) => m.userRole === "ADMIN") ?? []);
const users = computed(() => members.value?.filter((m) => m.userRole === "USER") ?? []);

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function isOnline(userId: number): boolean {
  return props.onlineUserIds.has(userId);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="px-4 pt-4 pb-3 flex items-baseline gap-2">
      <span class="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-dimmed">Members</span>
      <span v-if="members?.length" class="text-[0.65rem] font-semibold text-dimmed/60">{{ members.length }}</span>
    </div>

    <!-- No room selected -->
    <div v-if="!roomId" class="flex flex-col items-center justify-center gap-3 flex-1 py-8 px-4">
      <div class="size-12 rounded-2xl bg-accented flex items-center justify-center">
        <UIcon name="i-lucide-users" class="text-xl text-dimmed/50" />
      </div>
      <p class="text-xs text-dimmed text-center m-0 leading-relaxed">Select a room<br />to see its members</p>
    </div>

    <!-- Loading -->
    <div v-else-if="isPending" class="flex flex-col gap-3 px-4 pt-1">
      <div v-for="i in 4" :key="i" class="flex items-center gap-2.5">
        <div class="size-9 rounded-full bg-accented animate-pulse shrink-0" />
        <div class="flex flex-col gap-1.5 flex-1">
          <div class="h-3 w-24 rounded bg-accented animate-pulse" />
          <div class="h-2.5 w-14 rounded bg-accented/60 animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="isError"
      class="flex flex-col items-center justify-center gap-2 flex-1 py-8 px-4 text-error text-xs">
      <UIcon name="i-lucide-wifi-off" class="text-xl" />
      <span>Failed to load members</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!members?.length"
      class="flex flex-col items-center justify-center gap-2 flex-1 py-8 px-4 text-dimmed text-xs">
      <UIcon name="i-lucide-users" class="text-2xl opacity-25" />
      <span>No members yet</span>
    </div>

    <!-- Grouped list -->
    <div v-else class="flex flex-col gap-5 px-3 pt-1 pb-4 overflow-y-auto flex-1">
      <!-- Admins section -->
      <section v-if="admins.length">
        <p class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dimmed px-1.5 mb-2 m-0">
          Admin &middot; {{ admins.length }}
        </p>
        <ul class="list-none m-0 p-0 flex flex-col gap-0.5">
          <li
            v-for="member in admins"
            :key="member.id"
            class="flex items-center gap-2.5 px-1.5 py-2 rounded-lg hover:bg-accented/50 transition-colors duration-120 cursor-default">
            <div class="relative shrink-0">
              <div
                class="size-9 rounded-full flex items-center justify-center text-[0.72rem] font-bold text-white shadow-sm"
                style="background: linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.65 0.180 21))">
                {{ initials(member.userName) }}
              </div>
              <div
                class="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background shadow-sm"
                :class="isOnline(member.userId) ? 'bg-[oklch(0.63_0.144_128)]' : 'bg-[oklch(0.48_0_0)]'"
              />
            </div>
            <div class="flex flex-col overflow-hidden min-w-0">
              <span class="text-[0.8125rem] font-medium text-default truncate">{{ member.userName }}</span>
              <span class="text-[0.7rem] font-semibold" style="color: oklch(0.65 0.180 21)">Admin</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- Users section -->
      <section v-if="users.length">
        <p class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-dimmed px-1.5 mb-2 m-0">
          Members &middot; {{ users.length }}
        </p>
        <ul class="list-none m-0 p-0 flex flex-col gap-0.5">
          <li
            v-for="member in users"
            :key="member.id"
            class="flex items-center gap-2.5 px-1.5 py-2 rounded-lg hover:bg-accented/50 transition-colors duration-120 cursor-default">
            <div class="relative shrink-0">
              <div
                class="size-9 rounded-full flex items-center justify-center text-[0.72rem] font-bold"
                style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.18), oklch(0.65 0.180 21 / 0.12)); color: oklch(0.65 0.180 21)">
                {{ initials(member.userName) }}
              </div>
              <div
                class="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background shadow-sm"
                :class="isOnline(member.userId) ? 'bg-[oklch(0.63_0.144_128)]' : 'bg-[oklch(0.48_0_0)]'"
              />
            </div>
            <div class="flex flex-col overflow-hidden min-w-0">
              <span class="text-[0.8125rem] font-medium text-default truncate">{{ member.userName }}</span>
              <span class="text-[0.7rem] text-dimmed font-medium">Member</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
