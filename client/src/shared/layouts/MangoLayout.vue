<script setup lang="ts">
const props = withDefaults(defineProps<{
  showMembers?: boolean;
}>(), {
  showMembers: true,
});
</script>

<template>
  <div class="grid grid-rows-[56px_1fr] h-dvh overflow-hidden bg-background">
    <!-- Navbar -->
    <header class="border-b border-default bg-elevated z-10">
      <slot name="navbar" />
    </header>

    <!-- Body: sidebar + main + (optional) members -->
    <div class="grid overflow-hidden" :class="showMembers ? 'grid-cols-[260px_1fr_240px]' : 'grid-cols-[260px_1fr]'">
      <aside class="border-r border-default bg-muted overflow-y-auto">
        <slot name="sidebar" />
      </aside>

      <main class="flex flex-col overflow-hidden bg-background">
        <slot />
      </main>

      <aside v-if="showMembers" class="border-l border-default bg-muted overflow-y-auto">
        <slot name="members" />
      </aside>
    </div>
  </div>
</template>
