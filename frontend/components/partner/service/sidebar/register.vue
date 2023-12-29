<template>
  <div
    class="fixed top-0 right-0 bg-slate-100 p-5 transition-all ease-in-out delay-300"
    style="height: 95vh"
    :class="{
      'w-0': !isOpen,
      'opacity-0': !isOpen,
      'w-1/4': isOpen,
      'opacity-100': isOpen,
    }"
  >
    <partner-service-view :marker="marker" />

    <div class="flex flex-row">
      <UButton class="flex-1 w-100 mr-2" size="lg" variant="link">
        Cancel
      </UButton>

      <UButton
        class="flex-1 w-100"
        size="lg"
        color="secondary"
        @click="selectPlace"
      >
        Select this place
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSidebar } from "./use_sidebar.composable";

const { isOpen, marker } = useSidebar();
const emit = defineEmits(["selectPlace"]);

const selectPlace = () => {
  emit("selectPlace", marker.value);
};
</script>

<style>
.image-area {
  max-height: 320px;
  overflow: hidden;
}
</style>
