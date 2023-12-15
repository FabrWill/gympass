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

    <GoogleMap
      class="flex-1 mt-6"
      ref="maps"
      api-key="AIzaSyApDsyZ04sbhkYMUom1KTt4rPTkBz5p1RM"
      style="width: 100%; height: 500px"
      :center="location.userPosition"
      :zoom="15"
    >
      <Marker
        v-if="location && location.userLocation"
        :options="{ position: location.userPosition }"
      />
    </GoogleMap>
  </layout-view>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { GoogleMap } from "vue3-google-map";
import { useLocationStore } from "~/components/maps/stores/location.store";

const location = useLocationStore();

onMounted(() => {
  location.getUserLocation(navigator);
});
</script>
