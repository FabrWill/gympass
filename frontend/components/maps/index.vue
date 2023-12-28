<template>
  <GoogleMap
    class="flex-1 mt-6"
    style="width: 100%; height: 500px"
    :api-key="apiKey"
    :center="location.userPosition"
    :zoom="15"
  >
    <Marker
      v-if="location && location.userLocation"
      :options="{ position: location.userPosition }"
    />

    <slot />
  </GoogleMap>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from "vue3-google-map";
import { UserLocation } from "./stores/user_location.store";

const apiKey = useRuntimeConfig().public.googleMapsApiKey;
const location = UserLocation();

onMounted(() => {
  location.getUserLocation(navigator);
});
</script>
