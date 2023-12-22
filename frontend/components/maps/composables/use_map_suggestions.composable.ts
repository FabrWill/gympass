import { ref, computed } from 'vue';

export function useMapSuggestions() {
  const markers = ref<google.maps.Marker[]>([]);
  const isLoading = ref(false);
  const error = ref("");

  async function getSuggestedServices(position: google.maps.LatLng, map: google.maps.Map) {
    try {
      isLoading.value = true;

      const service = new window.google.maps.places.PlacesService(map);
      const request: any = {
        location: position,
        radius: 5000,
        type: ['gym'],
      };

      service.nearbySearch(request, (results, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }

        markers.value = serializeMarkers(results);
      });
    } catch (err) {
      console.error(err);
      error.value = `${err}`;
    } finally {
      isLoading.value = false;
    }
  }

  function serializeMarkers(results: any[]) {
    console.log(results);
    return results
      .filter(result => result.geometry && result.business_status === "OPERATIONAL")
      .map(result => {
        const marker: any = new window.google.maps.Marker({
          position: result.geometry?.location,
          icon: `${window.location.origin}/gym_marker.png`,
        });

        marker.customInfo = result;
        return marker;
      });
  }

  return {
    markers,
    isLoading,
    error,
    getSuggestedServices,
  };
}
