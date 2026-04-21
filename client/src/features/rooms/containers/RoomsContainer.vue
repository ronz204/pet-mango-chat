<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

import MangoLayout from "@layouts/MangoLayout.vue";
import RoomsNavbar from "../components/RoomsNavbar.vue";
import RoomsSidebar from "../components/RoomsSidebar.vue";
import MembersSidebar from "../components/MembersSidebar.vue";
import RoomHeader from "../components/RoomHeader.vue";
import MessageList from "../components/MessageList.vue";
import MessageInput from "../components/MessageInput.vue";
import TypingIndicator from "../components/TypingIndicator.vue";

import { useGetMyRooms } from "../services/useGetMyRooms";
import { useGetMessages } from "../services/useGetMessages";
import { useGetRoomMembers } from "../services/useGetRoomMembers";
import { useRoomWebSockets } from "../services/useRoomWebSockets";
import { useGetProfile } from "@features/identity/services/useGetProfile";

const route = useRoute();

const roomId = computed(() => {
  const id = route.params.roomId;
  return id ? Number(id) : null;
});

const { data: rooms } = useGetMyRooms();
const { data: profile } = useGetProfile();
const { data: messagesData, isPending: loadingMessages } = useGetMessages(roomId);
const { data: members } = useGetRoomMembers(roomId);

// Find current room from the list
const currentRoom = computed(() => {
  if (!roomId.value || !rooms.value) return null;
  return rooms.value.find((r) => r.id === roomId.value);
});

// WebSockets unified
const {
  messages,
  onlineUserIds,
  typingUserIds,
  isSending,
  isMessagesConnected,
  sendMessage,
  sendTypingStart,
  sendTypingStop,
  setMessages,
} = useRoomWebSockets({ roomId });

// Update messages when data is loaded
watch(messagesData, (newMessages) => {
  if (newMessages) {
    setMessages(newMessages);
  }
}, { immediate: true });
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
        <RoomHeader :room-id="roomId" :room-name="currentRoom?.name" />

        <!-- Messages area -->
        <MessageList
          :messages="messages"
          :current-user-id="profile?.id"
          :loading="loadingMessages"
        />

        <!-- Typing indicator -->
        <TypingIndicator
          :typing-user-ids="typingUserIds"
          :members="members"
          :current-user-id="profile?.id"
        />

        <!-- Message input -->
        <MessageInput
          :room-name="currentRoom?.name"
          :disabled="!isMessagesConnected"
          :sending="isSending"
          @send="sendMessage"
          @typing-start="sendTypingStart"
          @typing-stop="sendTypingStop"
        />
      </template>

      <!-- No room selected -->
      <div v-else class="flex flex-col items-center justify-center gap-6 flex-1 p-8 text-center">
        <div class="relative">
          <div class="size-20 rounded-3xl flex items-center justify-center shadow-md"
            style="background: linear-gradient(145deg, oklch(0.70 0.187 46 / 0.14), oklch(0.65 0.180 21 / 0.10))">
            <UIcon name="i-lucide-hash" class="text-4xl" style="color: oklch(0.70 0.187 46 / 0.5)" />
          </div>
          <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full border-2 border-background shadow-sm"
            style="background: linear-gradient(135deg, oklch(0.70 0.187 46), oklch(0.58 0.180 38))" />
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold text-highlighted m-0">Welcome to Mango</h3>
          <p class="text-sm text-muted max-w-60 leading-relaxed m-0">
            Pick a room from the sidebar to start chatting with your team.
          </p>
        </div>
        <RouterLink to="/rooms/create">
          <UButton variant="soft" icon="i-lucide-plus" size="md">
            Create Room
          </UButton>
        </RouterLink>
      </div>
    </template>

    <!-- Right sidebar: members -->
    <template #members>
      <MembersSidebar :room-id="roomId" :online-user-ids="onlineUserIds" />
    </template>
  </MangoLayout>
</template>
