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
      :center="location.userPosition"
      :zoom="15"
    >
      <Marker
        v-if="location && location.userLocation"
        :options="{ position: location.userPosition }"
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
import { useUserLocationStore } from "~/components/maps/stores/user_location.store";
import { useSuggestedServiceStore } from "~/components/maps/stores/suggested_services.store";

const location = useUserLocationStore();
const suggestions = useSuggestedServiceStore();

const maps = ref<google.maps.Map>();
const apiKey = useRuntimeConfig().public.googleMapsApiKey;

onMounted(async () => {
  await location.getUserLocation(navigator);

  setTimeout(async () => {
    await suggestions.getSuggestedServices(location.userPosition, maps.value);
  }, 1000);
});

const check = (e: google.maps.MouseEvent) => {
  console.log(e);
};
</script>
