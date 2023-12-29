<template>
  <div class="flex flex-col h-full">
    <div class="flex-row my-12">
      <h3 class="text-2xl font-medium font-sans text-gray-800">
        {{ marker?.name }}
      </h3>
      <span class="text-secondary"> Gympass Partner </span>
    </div>
    <div class="flex-row image-area">
      <img
        :src="marker && marker.photos ? marker.photos[0].getUrl() : ''"
        alt="service image"
      />"
    </div>

    <div class="flex-row my-6">
      <form-rating :value="marker?.rating ?? 0" />
    </div>

    <div class="flex-row text-gray-700">
      <p>{{ marker?.vicinity }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

type Props = {
  marker: google.maps.places.PlaceResult;
};
const props = defineProps<Props>();
</script>

<style>
.image-area {
  max-height: 320px;
  overflow: hidden;
}
</style>
