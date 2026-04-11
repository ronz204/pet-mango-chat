import { HttpClient } from "./http.client";
import { AuthInterceptor } from "./interceptors";
import { BodyInterceptor } from "./interceptors";
import type { HttpConfig } from "./http.models";

export class HttpFacade {
  private readonly api: HttpClient;

  constructor() {
    this.api = new HttpClient({
      url: import.meta.env.VITE_API_URL,
      headers: { "Content-Type": "application/json" },
      interceptors: [AuthInterceptor, BodyInterceptor],
    });
  };

  public get<T>(endpoint: string, config: HttpConfig = {}): Promise<T> {
    return this.api.request<T>({ endpoint, method: "GET", config });
  };

  public post<T>(endpoint: string, config: HttpConfig = {}): Promise<T> {
    return this.api.request<T>({ endpoint, method: "POST", config });
  };

  public put<T>(endpoint: string, config: HttpConfig = {}): Promise<T> {
    return this.api.request<T>({ endpoint, method: "PUT", config });
  };

  public patch<T>(endpoint: string, config: HttpConfig = {}): Promise<T> {
    return this.api.request<T>({ endpoint, method: "PATCH", config });
  };

  public delete<T>(endpoint: string, config: HttpConfig = {}): Promise<T> {
    return this.api.request<T>({ endpoint, method: "DELETE", config });
  };
};

export const api = new HttpFacade();
