// useLocationStore.ts
import type { google } from "google-maps";
import { defineStore } from "pinia";
import Marker from "~/domain/maps/marker";

interface State {
  userLocation: google.maps.LatLng | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserLocationStore = defineStore("user_location", {
  state: (): State => ({
    userLocation: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    userPosition(): google.maps.LatLng {
      return this.userLocation || Marker.defaultMarker();
    },
  },

  actions: {
    async getUserLocation(navigator: Navigator) {
      try {
        this.isLoading = true;

        const position = await this.getLocationPromise(navigator);

        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } as unknown as google.maps.LatLng;
      } catch (error) {
        console.error(error);
        this.error = `${error}`;
      } finally {
        this.isLoading = false;
      }
    },

    getLocationPromise(navigator: Navigator): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) => {
        if (!navigator || !navigator.geolocation) {
          reject("Geolocation is not supported by this browser.");
        } else {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      });
    },
  },
});
