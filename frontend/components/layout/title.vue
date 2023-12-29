<template>
  <div class="flex flex-row items-start justify-start">
    <h2 class="text-2xl flex-1 font-bold font-sans text-black">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
