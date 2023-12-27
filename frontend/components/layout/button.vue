<template>
  <button :class="getButtonStyle" type="button" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { Button } from "@nuxt/ui/dist/runtime/types";
import { defineEmits } from "vue";

const props = defineProps<{
  outlined?: boolean;
}>();

const buttonStyles = {
  outlined:
    "bg-white hover:bg-blue-200 text-black font-bold border-2 border-blue-500 w-full flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline",
  default:
    "bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-500 w-full flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline",
};

const getButtonStyle = computed(() =>
  props.outlined ? buttonStyles.outlined : buttonStyles.default
);

const emit = defineEmits<{
  (event: "click"): void;
}>();

function handleClick() {
  emit("click");
}
</script>

<style scoped></style>
