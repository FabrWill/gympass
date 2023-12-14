<template>
  <layout-view>
    <GoogleMap
      class="flex-1"
      api-key=""
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
    >
    </GoogleMap>
  </layout-view>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from "vue3-google-map";

const center = { lat: 40.689247, lng: -74.044502 };
</script>
