<template>
  <div class="flex flex-col h-full">
    <div class="flex-row my-12">
      <h3 class="text-2xl font-medium font-sans text-gray-800">
        {{ marker?.name }}
      </h3>
      <span class="text-secondary"> Gympass Partner </span>
    </div>
    <div class="flex-row image-area">
      <img :src="marker?.photos[0].getUrl()" alt="service image" />"
    </div>

    <div class="flex-row my-6">
      <form-rating v-model="marker?.rating" />
    </div>

    <div class="flex-row text-gray-700">
      <p>{{ marker?.vicinity }}</p>
    </div>

    <div class="flex-row flex-1"></div>
  </div>
</template>

<script lang="ts" setup>
import type { google } from "google-maps";
import { defineProps } from "vue";

type Props = {
  marker: google.maps.places.PlaceResult;
};

defineProps<Props>();
</script>

<style>
.image-area {
  max-height: 320px;
  overflow: hidden;
}
</style>
