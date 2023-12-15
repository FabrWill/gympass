import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import GoogleMapsClient from "./clients/google_maps.client";

export default class HttWrapper {
  private client: AxiosInstance;
  private uri: string;

  constructor(uri?: string) {
    this.client = GoogleMapsClient;
    this.uri = uri ? `${uri}` : "";
  }

  public get<T = any>(
    path?: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get(`${this.uri}${path}`, config);
  }

  public post<T = any>(
    path?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post(`${this.uri}${path}`, data, config);
  }

  public put<T = any>(
    path?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put(`${this.uri}${path}`, data, config);
  }

  public patch<T = any>(
    path?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch(`${this.uri}${path}`, data, config);
  }

  public delete<T = any>(
    path?: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete(`${this.uri}${path}`, config);
  }
}
