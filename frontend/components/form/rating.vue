<template>
  <div class="flex items-center">
    <button
      type="button"
      v-for="i in 5"
      :key="i"
      :class="{ 'mr-1': i < 5 }"
      @click="updateRating(i)"
    >
      <svg
        class="block h-6 w-6"
        :class="[value || 0 >= i ? 'text-secondary' : 'text-grey']"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </button>
    <span class="text-xs text-secondary">
      {{ value }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: Number,
});

const emit = defineEmits(["update:value"]);

function updateRating(newRating: number) {
  emit("update:value", newRating);
}
</script>
