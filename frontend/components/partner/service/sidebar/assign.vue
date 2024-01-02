<template>
  <div
    class="fixed top-0 right-0 bg-slate-100 dark:bg-slate-900 p-5 transition-all ease-in-out delay-300 pb-16 h-screen"
    :class="{
      'w-0': !isOpen,
      'opacity-0': !isOpen,
      'w-1/4': isOpen,
      'opacity-100': isOpen,
    }"
  >
    <partner-service-view :marker="marker" />
  </div>
</template>

<script lang="ts" setup>
import { useSidebar } from "./use_sidebar.composable";

const { isOpen, marker } = useSidebar();
</script>
