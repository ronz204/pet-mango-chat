<script setup lang="ts">
defineProps<{
  roomName?: string;
  loading?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-3.5 px-6 h-16 border-b border-default shrink-0 bg-elevated">
    <!-- Room icon -->
    <div
      class="flex items-center justify-center size-9 rounded-xl shrink-0 shadow-sm"
      style="background: linear-gradient(135deg, oklch(0.70 0.187 46 / 0.15), oklch(0.65 0.180 21 / 0.10))">
      <UIcon name="i-lucide-hash" class="text-primary text-base" />
    </div>

    <!-- Title area -->
    <div class="flex flex-col justify-center overflow-hidden">
      <div v-if="loading" class="flex flex-col gap-1.5">
        <div class="h-4 w-36 rounded bg-accented animate-pulse" />
        <div class="h-3 w-20 rounded bg-accented/60 animate-pulse" />
      </div>
      <template v-else>
        <h1 class="text-[0.9375rem] font-bold text-highlighted m-0 truncate">{{ roomName }}</h1>
        <p class="text-xs text-dimmed m-0">Public channel</p>
      </template>
    </div>
  </div>
</template>
