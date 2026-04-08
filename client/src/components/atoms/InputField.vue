<script setup lang="ts">
interface Props {
  id: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  autocomplete?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue || ''"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :class="[
      'w-full px-4 py-2.5 rounded-lg font-body text-base border-2 transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500',
      error
        ? 'border-secondary-500 focus:border-secondary-600 focus:ring-secondary-500'
        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
    ]"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
