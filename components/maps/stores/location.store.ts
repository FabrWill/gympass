// useLocationStore.ts
import type { google } from "google-maps";
import { defineStore } from "pinia";
import Marker from "~/domain/maps/marker";

interface LocationState {
  markers: google.maps.Marker[];
  mapReference: google.maps.Map | null;
  userLocation: google.maps.LatLng | null;
  isLoading: boolean;
  error: string | null;
}

export const useLocationStore = defineStore("location", {
  state: (): LocationState => ({
    userLocation: null,
    mapReference: null,
    markers: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    userPosition(): google.maps.LatLng {
      return this.userLocation || Marker.defaultMarker();
    },
  },

  actions: {
    getUserLocation(navigator: Navigator) {
      if (!navigator || !navigator.geolocation) {
        this.error = "Geolocation is not supported by this browser.";
        return;
      }

      this.isLoading = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isLoading = false;

          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          } as unknown as google.maps.LatLng;
        },
        (error) => {
          this.isLoading = false;
          this.error = `Erro ao obter a localização: ${error.message}`;
        }
      );
    },
  },
});
