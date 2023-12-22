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
      <div class="flex items-center">
        <button
          type="button"
          v-for="i in 5"
          :class="{ 'mr-1': i < 5 }"
          @click="$emit('input', i)"
        >
          <svg
            class="block h-6 w-6"
            :class="[marker?.rating ?? 0 >= i ? 'text-secondary' : 'text-grey']"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        </button>
        <span class="text-xs text-secondary">
          {{ marker?.rating ?? 0 }}
        </span>
      </div>
    </div>

    <div class="flex-row text-gray-700">
      <p>{{ marker?.vicinity }}</p>
    </div>

    <div class="˜flex-row my-6">
      <div class="text-md font-light text-gray-500">
        from <span class="line-through">$200.00</span>
      </div>
      <div class="text-md font-light text-gray-500">
        to <span class="text-3xl text-secondary">$180.00</span> per month
      </div>
    </div>

    <div class="flex-row flex-1"></div>

    <div class="flex flex-row">
      <button
        class="bg-transparent flex-1 mr-4 hover:bg-black text-black hover:text-white font-medium border-2 border-black flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Cancel
      </button>

      <button
        class="bg-primary-500 flex-1 hover:bg-primary-600 text-white font-medium border-2 border-primary-500 flex flex-row p-1 text-center items-center justify-center rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Book this service
      </button>
    </div>
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
