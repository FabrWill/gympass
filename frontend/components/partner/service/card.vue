<template>
  <div
    class="hover:bg-primary-200 cursor-pointer p-4 rounded-lg border-primary-500 h-12 border flex flex-row items-center dark:bg-slate-900"
  >
    <img :src="brand" alt="Logo Marca 3" class="w-8 mx-auto flex-none" />
    <h2 class="pl-8 text-start text-base leading-6 flex-1">{{ name }}</h2>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type Props = {
  brand: string;
  name: string;
};

defineProps<Props>();
</script>
