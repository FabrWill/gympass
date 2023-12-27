<template>
  <div class="mb-6">
    <label class="block text-black-700 text-sm font-bold mb-2" for="label">
      {{ label }}
    </label>
    <input
      :id="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border focus:border-2 border-black-400 focus:border-blue-500 rounded w-full py-2 px-3 text-black-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputVariant } from "@nuxt/ui/dist/runtime/types";
import { defineProps } from "vue";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  modelValue: any;
};

defineProps<Props & InputVariant>();
</script>
