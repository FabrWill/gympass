<template>
  <div
    class="fixed z-10 mr-2 overflow-hidden bg-slate-100 dark:bg-slate-900 menu"
    style="margin-top: 60px"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div
      v-for="item in menu"
      :key="item.text"
      class="hover:bg-gray-200 border-r-2 border-transparent hover:border-secondary cursor-pointer"
    >
      <UButton
        variant="ghost"
        class="pa-2 flex w-48 text-slate-700"
        @click="$router.push({ name: item.pageName })"
      >
        <MdiIcon
          :icon="item.icon"
          class="ml-4 mr-4 mt-3"
          size="38px"
          viewbox="0 0 32 32"
          :class="route.name == item.pageName ? 'text-primary' : 'text-gray'"
        />
        <span
          class="text-lg"
          :class="route.name == item.pageName ? 'text-primary' : 'text-gray'"
        >
          {{ item.text }}
        </span>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const route = useRoute();

const isExpanded = ref(false);

const menu: { text: string; icon: any; pageName: string }[] = [
  { text: "Home", icon: "mdiMapSearchOutline", pageName: "dashboard" },
  { text: "Partners", icon: "mdiMapPlus", pageName: "partner" },
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
