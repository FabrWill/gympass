<template>
  <layout-view>
    <div class="flex flex-row">
      <div class="flex-1">
        <partner-service-view :marker="marker" />
      </div>

      <div class="flex-1">aqui é o form</div>
    </div>
  </layout-view>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route.params);

const marker = ref(route.params.place);
</script>
