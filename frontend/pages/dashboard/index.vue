<template>
  <layout-view>
    <div class="flex flex-col items-start justify-start">
      <h2 class="text-2xl font-bold font-sans text-black">
        Your current services
      </h2>
    </div>

    <services-list />

    <div class="flex flex-col items-start justify-start">
      <h2 class="text-lg font-light font-serif text-gray-800">
        Available Partners Near You
      </h2>
    </div>

    <div class="invisible" ref="maps"></div>
    <GoogleMap
      class="flex-1 mt-6"
      style="width: 100%; height: 500px"
      :api-key="apiKey"
      :center="userLocation.userPosition.value"
      :zoom="15"
    >
      <Marker
        v-if="userLocation && userLocation.userLocation"
        :options="{ position: userLocation.userPosition.value }"
      />

      <Marker
        v-for="(marker, index) in suggestions.markers"
        :key="index"
        :options="marker"
        @click="check"
      />
    </GoogleMap>
  </layout-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { useUserLocation } from "~/components/maps/composables/use_user_location.composable";
import { useMapSuggestions } from "~/components/maps/composables/use_map_suggestions.composable";

const userLocation = useUserLocation();
const suggestions = useMapSuggestions();

const maps = ref<google.maps.Map>();
const apiKey = useRuntimeConfig().public.googleMapsApiKey;

watch([userLocation.userPosition, maps], ([userPosition, maps]: any) => {
  if (!userPosition || !maps) return;
  suggestions.getSuggestedServices(userPosition, maps);
});

const check = (e: google.maps.MouseEvent) => {
  console.log(e);
};
</script>
