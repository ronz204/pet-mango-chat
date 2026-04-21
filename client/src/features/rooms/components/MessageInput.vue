<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  roomName?: string;
  disabled?: boolean;
  sending?: boolean;
}>();

const emit = defineEmits<{
  send: [content: string];
}>();

const content = ref("");

const handleSubmit = () => {
  const trimmed = content.value.trim();
  if (!trimmed) return;
  
  emit("send", trimmed);
  content.value = "";
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSubmit();
  }
};
</script>

<template>
  <div class="px-6 py-4 border-t border-default bg-elevated shrink-0">
    <div class="flex items-end gap-2">
      <!-- Input field -->
      <div class="flex-1">
        <UTextarea
          v-model="content"
          :placeholder="`Message ${roomName ? '#' + roomName : 'room'}`"
          :rows="1"
          :maxrows="5"
          autoresize
          :disabled="disabled || sending"
          size="lg"
          class="w-full"
          @keydown="handleKeydown"
        />
      </div>

      <!-- Send button -->
      <UButton
        icon="i-lucide-send"
        size="lg"
        :disabled="!content.trim() || disabled"
        :loading="sending"
        aria-label="Send message"
        @click="handleSubmit"
      />
    </div>

    <!-- Help text -->
    <p class="text-xs text-dimmed mt-2 m-0">
      Press <kbd class="px-1.5 py-0.5 rounded bg-accented text-muted text-[0.65rem] font-medium">Enter</kbd> to send,
      <kbd class="px-1.5 py-0.5 rounded bg-accented text-muted text-[0.65rem] font-medium">Shift + Enter</kbd> for new line
    </p>
  </div>
</template>
