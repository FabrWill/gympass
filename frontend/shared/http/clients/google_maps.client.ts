import axios from "axios";

export enum UnauthenticatedPath {
  SIGN_UP = "/sign-up",
  LOGIN = "/login",
  RECOVER = "/recover",
  RESET = "/reset",
}

const GoogleMapsClient = axios.create({
  // baseURL: "https://maps.googleapis.com/maps/api/",
  withCredentials: true,
  timeout: 6000,
  timeoutErrorMessage:
    "The server is taking too long to respond. Please try again later.",
});

export default GoogleMapsClient;
