<script setup lang="ts">
defineProps<{
  roomName?: string;
  loading?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-2.5 px-5 h-13 border-b border-default shrink-0 bg-elevated">
    <!-- Room icon -->
    <div
      class="flex items-center justify-center size-7 rounded bg-[oklch(0.70_0.187_46/0.12)] text-primary text-sm shrink-0">
      <UIcon name="i-lucide-hash" />
    </div>

    <!-- Name skeleton while loading -->
    <div v-if="loading" class="h-4 w-36 rounded bg-accented animate-pulse" />
    <h1 v-else class="text-[0.9375rem] font-semibold text-highlighted m-0">{{ roomName }}</h1>
  </div>
</template>
