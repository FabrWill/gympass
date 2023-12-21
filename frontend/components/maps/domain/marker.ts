import type { google } from "google-maps";

export enum MarkerType {
  GYM = "gym",
  HOME = "home",
}

export default class Marker {
  static build(position: google.maps.LatLng) {
    return new google.maps.Marker({
      position,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#FF0000",
        fillOpacity: 0.4,
        strokeWeight: 0.4,
      },
    });
  }

  static defaultMarker(): google.maps.LatLng {
    const criciumaLocation: any = {
      lat: -28.6953463,
      lng: -49.4199388,
    };

    return criciumaLocation;
  }
}
