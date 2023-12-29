<template>
  <layout-view>
    <layout-title title="Select a Place to Register" />

    <client-only>
      <div class="invisible" ref="maps"></div>
      <Maps @ready="onMapIsReady">
        <Marker
          v-for="(marker, index) in (suggestions.markers.value as any)"
          :key="index"
          :options="marker"
          @click="() => check(marker.customInfo)"
        />
      </Maps>
    </client-only>

    <partner-service-sidebar-register @select-place="goToServiceRegisterStep" />
  </layout-view>
</template>

<script setup lang="ts">
import { Marker } from "vue3-google-map";
import { useMapSuggestions } from "~/components/maps/composables/use_map_suggestions.composable";
import { UserLocation } from "~/components/maps/stores/user_location.store";
import { useSidebar } from "~/components/partner/service/sidebar/use_sidebar.composable";
import { usePartnerPlaceRegister } from "./partner_place_register.composable";

const suggestions = useMapSuggestions();
const maps = ref<google.maps.Map>();
const location = UserLocation();

const onMapIsReady = () => {
  if (!location.userPosition || !maps.value) return;

  suggestions.getSuggestedServices(location.userPosition, maps.value);
};

const sidebar = useSidebar();
const check = (marker: any) => {
  sidebar.openSidebar(marker);
};

const { selectPlace } = usePartnerPlaceRegister();
const router = useRouter();

const goToServiceRegisterStep = (place: any) => {
  selectPlace(place);

  router.push({
    name: "partner-register-place-form",
  });
};
</script>
