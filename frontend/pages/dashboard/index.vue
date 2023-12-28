<template>
  <layout-view>
    <div class="flex flex-col items-start justify-start">
      <h2 class="text-2xl font-bold font-sans text-black">
        Your current services
      </h2>
    </div>

    <partner-service-list />

    <div class="flex flex-col items-start justify-start">
      <h2 class="text-lg font-light font-serif text-gray-800">
        Available Partners Near You
      </h2>
    </div>

    <Maps> </Maps>

    <partner-service-sidebar />
  </layout-view>
</template>

<script setup lang="ts">
import { Marker } from "vue3-google-map";
</script>
