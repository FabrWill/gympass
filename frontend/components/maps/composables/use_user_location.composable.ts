import { ref, computed, watch } from 'vue';
import Marker from '../domain/marker';

export function useUserLocation() {
  const userLocation = ref<google.maps.LatLng>(Marker.defaultMarker());
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  const userPosition = computed((): google.maps.LatLng => {
    return userLocation.value;
  });

  async function getUserLocation(navigator: Navigator) {
    try {
      isLoading.value = true;

      const position: any = await getLocationPromise(navigator);

      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      } as unknown as any;
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

  onMounted(() => {
    console.log("navigator", navigator);
    
    if (navigator) {
      getUserLocation(navigator);
    }
  });

  return {
    userLocation,
    isLoading,
    error,
    userPosition,
    getUserLocation,
  };
}
