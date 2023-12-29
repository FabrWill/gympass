<template>
  <layout-view>
    <div class="flex flex-col items-start justify-start">
      <h2 class="text-lg font-light font-serif text-gray-800">
        Select a Place to Register
      </h2>
    </div>

    <client-only>
      <div class="invisible" ref="maps"></div>
      <Maps @ready="onMapIsReady">
        <Marker
          v-for="(marker, index) in suggestions.markers.value"
          :key="index"
          :options="marker"
          @click="() => check(marker.customInfo)"
        />
      </Maps>
    </client-only>

    <partner-service-sidebar-register @select-place="goToNextStep" />
  </layout-view>
</template>

<script setup lang="ts">
import { Marker } from "vue3-google-map";
import { useMapSuggestions } from "~/components/maps/composables/use_map_suggestions.composable";
import { UserLocation } from "~/components/maps/stores/user_location.store";
import { useSidebar } from "~/components/partner/service/sidebar/use_sidebar.composable";

const suggestions = useMapSuggestions();
const router = useRouter();
const sidebar = useSidebar();

const maps = ref<google.maps.Map>();
const location = UserLocation();

const onMapIsReady = () => {
  if (!location.userPosition || !maps.value) return;

  suggestions.getSuggestedServices(location.userPosition, maps.value);
};

const goToNextStep = (place: any) => {
  router.push({
    name: "partner-register-place-form",
    params: { place: place.value },
  });
};

const check = (marker: any) => {
  sidebar.openSidebar(marker);
};
</script>
