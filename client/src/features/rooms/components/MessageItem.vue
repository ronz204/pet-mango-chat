<script setup lang="ts">
import { computed } from "vue";
import type { Message } from "../schemas/message.schema";

const props = defineProps<{
  message: Message;
  currentUserId?: number;
}>();

const isOwnMessage = computed(() => props.message.senderId === props.currentUserId);

const formattedTime = computed(() => {
  const date = new Date(props.message.timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
});

const initials = computed(() => {
  return props.message.senderName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <div class="flex gap-3 px-6 py-2.5 hover:bg-muted/30 transition-colors group">
    <!-- Avatar -->
    <div class="shrink-0">
      <div class="size-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm"
        :class="isOwnMessage
          ? 'bg-primary/15 text-primary'
          : 'bg-accented text-toned'
        ">
        {{ initials }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-sm font-bold text-highlighted">
          {{ message.senderName }}
        </span>
        <span class="text-xs text-dimmed">
          {{ formattedTime }}
        </span>
      </div>
      <p class="text-sm text-text m-0 leading-relaxed wrap-break-word whitespace-pre-wrap">
        {{ message.content }}
      </p>
    </div>
  </div>
</template>
