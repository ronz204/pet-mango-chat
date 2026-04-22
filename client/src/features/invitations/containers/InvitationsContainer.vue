<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import MangoLayout from "@layouts/MangoLayout.vue";
import RoomsNavbar from "@features/rooms/components/RoomsNavbar.vue";
import RoomsSidebar from "@features/rooms/components/RoomsSidebar.vue";
import { useGetMyInvitations } from "../services/useGetMyInvitations";
import { useAcceptInvitation } from "../services/useAcceptInvitation";
import { useDeclineInvitation } from "../services/useDeclineInvitation";

const router = useRouter();
const { data: invitations, isPending, isError } = useGetMyInvitations();
const acceptMutation = useAcceptInvitation();
const declineMutation = useDeclineInvitation();

const isProcessing = computed<boolean>(() =>
  acceptMutation.isPending.value || declineMutation.isPending.value
);

async function handleAccept(invitationId: number) {
  try {
    const result = await acceptMutation.mutateAsync(invitationId);
    router.push(`/rooms/${result.roomId}`);
  } catch (error) {
    console.error("Failed to accept invitation:", error);
  }
}

async function handleDecline(invitationId: number) {
  try {
    await declineMutation.mutateAsync(invitationId);
  } catch (error) {
    console.error("Failed to decline invitation:", error);
  }
}

function formatDate(date: Date) {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return dateObj.toLocaleDateString();
}
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

    <!-- Main content -->
    <template #default>
      <div class="flex flex-col h-full">
        <!-- Loading -->
        <div v-if="isPending" class="flex flex-col items-center justify-center gap-4 flex-1 p-8">
          <div class="size-12 rounded-2xl bg-accented animate-pulse" />
          <div class="flex flex-col gap-2 w-full max-w-md">
            <div v-for="i in 3" :key="i" class="h-20 rounded-lg bg-accented animate-pulse" />
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="isError" class="flex flex-col items-center justify-center gap-4 flex-1 p-8 text-center">
          <div class="size-16 rounded-2xl flex items-center justify-center bg-error/10">
            <UIcon name="i-lucide-wifi-off" class="text-3xl text-error" />
          </div>
          <div>
            <h3 class="text-base font-semibold text-highlighted m-0">Connection Error</h3>
            <p class="text-sm text-muted mt-1 m-0">Could not load your invitations</p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!invitations?.length"
          class="flex flex-col items-center justify-center gap-6 flex-1 p-8 text-center">
          <div class="relative">
            <div class="size-20 rounded-3xl flex items-center justify-center shadow-md"
              style="background: linear-gradient(145deg, oklch(0.70 0.187 46 / 0.14), oklch(0.65 0.180 21 / 0.10))">
              <UIcon name="i-lucide-mail-open" class="text-4xl" style="color: oklch(0.70 0.187 46 / 0.5)" />
            </div>
            <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full border-2 border-background shadow-sm"
              style="background: linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))" />
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold text-highlighted m-0">All caught up!</h3>
            <p class="text-sm text-muted max-w-60 leading-relaxed m-0">
              You don't have any pending room invitations at the moment.
            </p>
          </div>
          <RouterLink to="/rooms">
            <UButton variant="soft" icon="i-lucide-arrow-left" size="md">
              Back to Rooms
            </UButton>
          </RouterLink>
        </div>

        <!-- Invitations list -->
        <div v-else class="flex-1 overflow-y-auto p-6">
          <div class="max-w-3xl mx-auto">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-highlighted m-0">My Invitations</h2>
              <p class="text-sm text-muted mt-1 m-0">
                {{ invitations.length }} pending {{ invitations.length === 1 ? 'invitation' : 'invitations' }}
              </p>
            </div>

            <ul class="list-none m-0 p-0 flex flex-col gap-3">
              <li v-for="invitation in invitations" :key="invitation.id"
                class="group bg-elevated border border-default rounded-xl p-5 transition-all duration-200 hover:border-[oklch(0.70_0.187_46/0.3)] hover:shadow-sm">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      class="size-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
                      <span class="text-lg font-bold" style="color: oklch(0.70 0.187 46)">#</span>
                    </div>
                    <div class="flex-1 min-w-0 pt-0.5">
                      <h3
                        class="text-base font-semibold text-default m-0 truncate group-hover:text-primary transition-colors">
                        {{ invitation.room.name }}
                      </h3>
                      <p class="text-xs text-dimmed m-0 mt-1">
                        Invited {{ formatDate(invitation.createdAt) }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <UButton size="md" variant="soft" icon="i-lucide-check" :disabled="isProcessing"
                      @click="handleAccept(invitation.id)">
                      Accept
                    </UButton>
                    <UButton size="md" variant="ghost" color="neutral" icon="i-lucide-x" :disabled="isProcessing"
                      @click="handleDecline(invitation.id)" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- Right sidebar: empty for invitations -->
    <template #members>
      <div class="flex flex-col items-center justify-center h-full px-6 text-center">
        <div class="size-12 rounded-2xl flex items-center justify-center mb-3"
          style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
          <UIcon name="i-lucide-users" class="text-xl text-primary/40" />
        </div>
        <p class="text-xs text-dimmed m-0">
          Accept an invitation to see room members
        </p>
      </div>
    </template>
  </MangoLayout>
</template>
