<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import type { Message } from "../schemas/message.schema";
import MessageItem from "./MessageItem.vue";

const props = defineProps<{
  messages: Message[];
  currentUserId?: number;
  loading?: boolean;
}>();

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Watch for new messages and scroll to bottom
watch(() => props.messages.length, () => {
  scrollToBottom();
});

// Scroll to bottom on mount
defineExpose({ scrollToBottom });
</script>

<template>
  <div ref="messagesContainer" class="flex-1 overflow-y-auto">
    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col gap-0.5 p-6">
      <div v-for="i in 5" :key="i" class="flex gap-3 py-2.5">
        <div class="size-9 rounded-lg bg-accented animate-pulse" />
        <div class="flex-1 space-y-2">
          <div class="flex items-center gap-2">
            <div class="h-4 w-24 rounded bg-accented animate-pulse" />
            <div class="h-3 w-16 rounded bg-accented/60 animate-pulse" />
          </div>
          <div class="h-4 w-full rounded bg-accented/40 animate-pulse" />
          <div class="h-4 w-3/4 rounded bg-accented/40 animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="messages.length === 0" class="flex flex-col items-center justify-center h-full p-8 text-center">
      <div class="size-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
        style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.12), oklch(0.65 0.180 21 / 0.08))">
        <UIcon name="i-lucide-message-square-text" class="text-2xl text-primary/50" />
      </div>
      <h3 class="text-base font-bold text-highlighted m-0 mb-2">No messages yet</h3>
      <p class="text-sm text-muted max-w-xs leading-relaxed m-0">
        Be the first to break the ice! Send a message below to start the conversation.
      </p>
    </div>

    <!-- Messages list -->
    <div v-else class="py-4">
      <MessageItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :current-user-id="currentUserId"
      />
    </div>
  </div>
</template>
