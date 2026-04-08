<script setup lang="ts">
import { computed } from 'vue';
import InputField from '@atoms/InputField.vue';

interface Props {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  hint?: string;
  required?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const hasError = computed(() => !!props.errorMessage);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="props.id" class="font-label text-sm font-medium text-neutral-700">
      {{ props.label }}
      <span v-if="props.required" class="text-secondary-500">*</span>
    </label>

    <InputField :id="props.id" :type="props.type" :model-value="props.modelValue" :placeholder="props.placeholder"
      :disabled="props.disabled" :error="hasError" :autocomplete="props.autocomplete"
      @update:model-value="emit('update:modelValue', $event)" />

    <p v-if="props.errorMessage" class="text-sm font-body text-secondary-600">
      {{ props.errorMessage }}
    </p>

    <p v-else-if="props.hint" class="text-sm font-body text-neutral-500">
      {{ props.hint }}
    </p>
  </div>
</template>
