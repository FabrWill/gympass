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

  function serializeMarkers(results: google.maps.places.PlaceResult[]) {
    return results
      .filter(result => result.geometry)
      .map(result => {
        const marker: any = new window.google.maps.Marker({
          position: result.geometry?.location,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 11,
            fillColor: 'green',
            fillOpacity: 0.8,
            strokeWeight: 0.8,
          },
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
