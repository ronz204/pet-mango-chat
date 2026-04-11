<script setup lang="ts">
interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost";
  loading?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  loading: false,
  fullWidth: false,
});
</script>

<template>
  <button :type="props.type" :disabled="props.loading" :class="[
    'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    props.fullWidth && 'w-full',
    props.variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600',
    props.variant === 'ghost' && 'text-brand-500 hover:bg-brand-50',
  ]">
    <span v-if="props.loading" class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    <slot />
  </button>
</template>
