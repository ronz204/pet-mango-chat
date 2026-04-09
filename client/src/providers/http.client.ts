import type { HttpConfig } from "./http.builder";
import { HttpBuilder } from "./http.builder";

export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  };

  private async request<T>(endpoint: string, config?: HttpConfig): Promise<T> {
    const builder = new HttpBuilder(config || {});

    const url = builder.buildUrl(this.baseUrl, endpoint);
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    };

    return response.json();
  };

  public get<T>(url: string, config?: HttpConfig) {
    return this.request<T>(url, { ...config, method: "GET" });
  };

  public post<T>(url: string, config?: HttpConfig) {
    return this.request<T>(url, { ...config, method: "POST" });
  };

  public put<T>(url: string, config?: HttpConfig) {
    return this.request<T>(url, { ...config, method: "PUT" });
  };

  public delete<T>(url: string, config?: HttpConfig) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  };
};

export const api = new HttpClient(import.meta.env.VITE_API_URL);
