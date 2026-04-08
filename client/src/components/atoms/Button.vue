<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
});

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white disabled:bg-primary-300',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800 text-white disabled:bg-secondary-300',
  tertiary: 'bg-tertiary-600 hover:bg-tertiary-700 active:bg-tertiary-800 text-white disabled:bg-tertiary-300',
  outline: 'border-2 border-neutral-300 hover:border-neutral-400 active:border-neutral-500 text-neutral-700 disabled:border-neutral-200 disabled:text-neutral-400',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};
</script>

<template>
  <button :type="props.type" :disabled="props.disabled || props.loading" :class="[
    'font-label font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.fullWidth ? 'w-full' : '',
  ]">
    <span v-if="props.loading" class="inline-flex items-center gap-2">
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <span>Loading...</span>
    </span>
    <slot v-else />
  </button>
</template>
