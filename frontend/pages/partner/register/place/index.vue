<template>
  <layout-view>
    <div class="flex flex-col items-start justify-start">
      <h2 class="text-lg font-light font-serif text-gray-800">
        Select a Place to Register
      </h2>
    </div>

    <div class="invisible" ref="maps"></div>
    <Maps>
      <Marker
        v-for="(marker, index) in suggestions.markers.value"
        :key="index"
        :options="marker"
        @click="() => check(marker.customInfo)"
      />
    </Maps>

    <partner-service-sidebar-register />
  </layout-view>
</template>

<script setup lang="ts">
import { Marker } from "vue3-google-map";
import { useMapSuggestions } from "~/components/maps/composables/use_map_suggestions.composable";
import { UserLocation } from "~/components/maps/stores/user_location.store";
import { useSidebar } from "~/components/partner/service/sidebar/use_sidebar.composable";

const suggestions = useMapSuggestions();
const sidebar = useSidebar();

const maps = ref<google.maps.Map>();
const location = UserLocation();

const googleMapsService = computed(() => {
  return window?.google?.maps?.places;
});

watch(
  [location.userPosition, maps, googleMapsService],
  ([userPosition, maps, services]: any) => {
    console.log("estou aqui", userPosition, maps, services);
    if (!userPosition || !maps || !services) return;
    suggestions.getSuggestedServices(userPosition, maps);
  }
);

const check = (marker: any) => {
  sidebar.openSidebar(marker);
};
</script>
