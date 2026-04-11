<script setup lang="ts">
import { ref, computed } from "vue";
import { Eye, EyeOff } from "@lucide/vue";

interface Props {
  label?: string;
  error?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
};

const props = withDefaults(defineProps<Props>(), { type: "text" });
const model = defineModel<string>({ required: true });

const showPassword = ref(false);

const resolvedType = computed(() => {
  if (props.type === "password") return showPassword.value ? "text" : "password";
  return props.type;
});
</script>

<template>
  <div class="space-y-1.5">
    <div v-if="props.label || $slots.labelRight" class="flex items-center justify-between">
      <label class="text-sm font-medium leading-none text-gray-900">{{ props.label }}</label>
      <slot name="labelRight" />
    </div>

    <div class="relative">
      <span v-if="$slots.icon" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <slot name="icon" />
      </span>

      <input v-model="model" :type="resolvedType" :placeholder="props.placeholder" :class="[
        'flex h-10 w-full rounded-md border bg-white py-2 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        $slots.icon ? 'pl-10' : 'pl-3',
        props.type === 'password' ? 'pr-10' : 'pr-3',
        props.error
          ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20'
          : 'border-gray-200 focus-visible:border-brand-500 focus-visible:ring-brand-500/20',
      ]" />

      <button v-if="props.type === 'password'" type="button" tabindex="-1"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
        @click="showPassword = !showPassword">
        <EyeOff v-if="showPassword" :size="16" />
        <Eye v-else :size="16" />
      </button>
    </div>

    <p v-if="props.error" class="text-xs text-red-500">{{ props.error }}</p>
  </div>
</template>
