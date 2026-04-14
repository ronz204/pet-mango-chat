<template>
  <div class="grid grid-rows-[56px_1fr] h-dvh overflow-hidden bg-background">
    <!-- Navbar -->
    <header class="border-b border-default bg-elevated z-10">
      <slot name="navbar" />
    </header>

    <!-- Body: sidebar + main + members -->
    <div class="grid grid-cols-[240px_1fr_220px] overflow-hidden">
      <aside class="border-r border-default bg-muted overflow-y-auto">
        <slot name="sidebar" />
      </aside>

      <main class="flex flex-col overflow-hidden bg-background">
        <slot />
      </main>

      <aside class="border-l border-default bg-muted overflow-y-auto">
        <slot name="members" />
      </aside>
    </div>
  </div>
</template>
