<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useGetEligibleInvitees } from "@features/invitations/services/useGetEligibleInvitees";
import { useCreateInvitation } from "@features/invitations/services/useCreateInvitation";

const props = defineProps<{
  roomId: number;
  open: boolean;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const { data: eligibleUsers, isPending, isError, refetch } = useGetEligibleInvitees(computed(() => props.roomId));
const createMutation = useCreateInvitation();

const searchQuery = ref("");
const invitedUserIds = ref<Set<number>>(new Set());

const filteredUsers = computed(() => {
  if (!eligibleUsers.value) return [];
  if (!searchQuery.value) return eligibleUsers.value;
  
  const query = searchQuery.value.toLowerCase();
  return eligibleUsers.value.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
});

const invitingUserId = ref<number | null>(null);

async function handleInvite(userId: number) {
  invitingUserId.value = userId;
  try {
    await createMutation.mutateAsync({
      roomId: props.roomId,
      inviteeId: userId,
    });
    invitedUserIds.value.add(userId);
  } catch (error) {
    console.error("Failed to invite user:", error);
  } finally {
    invitingUserId.value = null;
  }
}

function isInvited(userId: number): boolean {
  return invitedUserIds.value.has(userId);
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function close() {
  emit("update:open", false);
  searchQuery.value = "";
  invitedUserIds.value.clear();
}

// Refetch when modal opens
watch(() => props.open, (newVal) => {
  if (newVal) {
    invitedUserIds.value.clear();
    refetch();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="close">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95">
          <div
            v-if="open"
            class="bg-elevated border border-default rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            @click.stop>
            <div class="p-6">
              <!-- Header -->
              <div class="flex items-start justify-between mb-5">
                <div>
                  <h2 class="text-xl font-bold text-highlighted m-0">Invite to Room</h2>
                  <p class="text-sm text-muted mt-1 m-0">
                    Select users to invite to this room
                  </p>
                </div>
                <button
                  class="size-8 rounded-lg flex items-center justify-center hover:bg-accented transition-colors"
                  @click="close">
                  <UIcon name="i-lucide-x" class="text-lg text-muted" />
                </button>
              </div>

              <!-- Search input -->
              <div class="mb-4">
                <UInput
                  v-model="searchQuery"
                  placeholder="Search by name or email..."
                  icon="i-lucide-search"
                  size="md"
                />
              </div>

              <!-- Loading state -->
              <div v-if="isPending" class="flex flex-col gap-2">
                <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-3 rounded-lg bg-accented animate-pulse">
                  <div class="size-10 rounded-full bg-muted" />
                  <div class="flex-1">
                    <div class="h-3 w-32 rounded bg-muted mb-2" />
                    <div class="h-2.5 w-24 rounded bg-muted/60" />
                  </div>
                </div>
              </div>

              <!-- Error state -->
              <div v-else-if="isError" class="flex flex-col items-center justify-center gap-3 py-8 text-center">
                <div class="size-14 rounded-2xl flex items-center justify-center bg-error/10">
                  <UIcon name="i-lucide-wifi-off" class="text-2xl text-error" />
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-highlighted m-0">Could not load users</h3>
                  <p class="text-xs text-muted mt-1 m-0">Please try again later</p>
                </div>
              </div>

              <!-- Empty state -->
              <div v-else-if="!filteredUsers.length" class="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div class="size-14 rounded-2xl flex items-center justify-center"
                  style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
                  <UIcon name="i-lucide-users" class="text-2xl text-primary/40" />
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-highlighted m-0">
                    {{ searchQuery ? 'No users found' : 'All users are members' }}
                  </h3>
                  <p class="text-xs text-muted mt-1 m-0">
                    {{ searchQuery ? 'Try a different search' : 'Everyone has already been invited' }}
                  </p>
                </div>
              </div>

              <!-- Users list -->
              <ul v-else class="list-none m-0 p-0 flex flex-col gap-1 max-h-80 overflow-y-auto">
                <li
                  v-for="user in filteredUsers"
                  :key="user.id"
                  class="group flex items-center gap-3 p-3 rounded-lg hover:bg-accented transition-colors duration-150">
                  <div
                    class="size-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.18), oklch(0.65 0.180 21 / 0.12)); color: oklch(0.65 0.180 21)">
                    {{ initials(user.name) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-default m-0 truncate">{{ user.name }}</h3>
                    <p class="text-xs text-dimmed m-0 truncate">{{ user.email }}</p>
                  </div>
                  <UButton
                    v-if="!isInvited(user.id)"
                    size="sm"
                    variant="soft"
                    icon="i-lucide-user-plus"
                    :loading="invitingUserId === user.id"
                    :disabled="!!invitingUserId"
                    @click="handleInvite(user.id)">
                    Invite
                  </UButton>
                  <div v-else class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success shrink-0">
                    <UIcon name="i-lucide-check" class="text-sm" />
                    <span class="text-xs font-semibold">Invited</span>
                  </div>
                </li>
              </ul>

              <!-- Footer -->
              <div class="flex justify-end gap-2 mt-5 pt-5 border-t border-default">
                <UButton variant="ghost" color="neutral" @click="close">
                  Close
                </UButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
