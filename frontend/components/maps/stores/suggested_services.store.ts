// useLocationStore.ts
import type { google } from "google-maps";
import { defineStore } from "pinia";

interface State {
  markers: google.maps.MarkerOptions[];
  isLoading: boolean;
  error: string | null;
}

export const useSuggestedServiceStore = defineStore("suggested_services", {
  state: (): State => ({
    markers: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async getSuggestedServices(position: google.maps.LatLng, map: any) {
      try {
        this.isLoading = true;

        const service = new window.google.maps.places.PlacesService(map);
        const request: any = {
          location: position,
          radius: "5000",
          type: ["gym"],
        };

        service.nearbySearch(request, (results, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }

          const validMarkers = results.filter((result) => result.geometry);
          this.markers = validMarkers.map(
            (
              result: google.maps.places.PlaceResult
            ): google.maps.MarkerOptions => {
              const marker: any = new window.google.maps.Marker({
                position: result.geometry!.location,
                // make then green
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 11,
                  fillColor: "green",
                  fillOpacity: 0.8,
                  strokeWeight: 0.8,
                },
              });

              marker.customInfo = result;

              return marker as google.maps.MarkerOptions;
            }
          );
        });
      } catch (error) {
        console.error(error);
        this.error = `${error}`;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
