// userLocationStore.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Marker from "../domain/marker";

export const UserLocation = defineStore("userLocation", () => {
  const userLocation = ref<google.maps.LatLng>(Marker.defaultMarker());
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  const userPosition = computed((): google.maps.LatLng => userLocation.value);

  async function getUserLocation(navigator: Navigator) {
    try {
      isLoading.value = true;
      const position: any = await getLocationPromise(navigator);

      userLocation.value = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
    } catch (err) {
      console.error(err);
      error.value = `${err}`;
    } finally {
      isLoading.value = false;
    }
  }

  async function getLocationPromise(navigator: Navigator) {
    return new Promise((resolve, reject) => {
      if (!navigator || !navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }

  return {
    userLocation,
    isLoading,
    error,
    userPosition,
    getUserLocation,
  };
});
