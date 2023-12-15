<template>
  <div
    class="fixed z-10 mr-2 overflow-hidden bg-slate-100 menu"
    style="margin-top: 60px"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div
      v-for="item in menu"
      :key="item.text"
      class="p-4 hover:bg-gray-200 border-r-2 border-transparent hover:border-secondary"
    >
      <div class="flex w-48 text-slate-700">
        <MdiIcon
          :icon="item.icon"
          class="ml-4 mr-4"
          size="38px"
          viewbox="0 0 32 32"
        />
        <span class="text-lg"> {{ item.text }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false);

const menu: { text: string; icon: any }[] = [
  { text: "Home", icon: "mdiMapSearchOutline" },
  { text: "Settings", icon: "mdiCog" },
];
</script>

<style>
.menu {
  width: 86px;
  height: calc(100% - 60px);
  transition: width 0.2s;
}

.menu:hover {
  width: 200px;
}
</style>
