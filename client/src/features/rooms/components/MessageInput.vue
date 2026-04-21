<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
  roomName?: string;
  disabled?: boolean;
  sending?: boolean;
}>();

const emit = defineEmits<{
  send: [content: string];
  typingStart: [];
  typingStop: [];
}>();

const content = ref("");
let typingTimeout: ReturnType<typeof setTimeout> | null = null;
let isTyping = ref(false);

// Watch for content changes to emit typing events
watch(content, (newValue) => {
  if (newValue.trim().length > 0) {
    // Start typing
    if (!isTyping.value) {
      emit("typingStart");
      isTyping.value = true;
    }

    // Reset the stop timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Auto-stop after 3 seconds of no typing
    typingTimeout = setTimeout(() => {
      if (isTyping.value) {
        emit("typingStop");
        isTyping.value = false;
      }
    }, 3000);
  } else {
    // Stop typing if input is empty
    if (isTyping.value) {
      emit("typingStop");
      isTyping.value = false;
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
  }
});

const handleSubmit = () => {
  const trimmed = content.value.trim();
  if (!trimmed) return;
  
  // Stop typing when sending
  if (isTyping.value) {
    emit("typingStop");
    isTyping.value = false;
  }
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

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
