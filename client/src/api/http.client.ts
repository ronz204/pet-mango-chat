import type {
  HttpRequest, HttpResponse,
  HttpClientOptions, HttpMethod,
} from "./http.models";

import { HttpHelper } from "./http.helper";
import { AuthInterceptor } from "./http.intercept";

export class HttpClient {
  private readonly options: HttpClientOptions;

  constructor(options: HttpClientOptions) {
    this.options = options;
  };

  public async get<T>(endpoint: string, config: HttpRequest): Promise<T> {
    return this.request<T>(endpoint, "GET", config);
  };

  public async post<T>(endpoint: string, config: HttpRequest): Promise<T> {
    return this.request<T>(endpoint, "POST", config);
  };

  public async put<T>(endpoint: string, config: HttpRequest): Promise<T> {
    return this.request<T>(endpoint, "PUT", config);
  };

  public async patch<T>(endpoint: string, config: HttpRequest): Promise<T> {
    return this.request<T>(endpoint, "PATCH", config);
  };

  public async delete<T>(endpoint: string, config: HttpRequest): Promise<T> {
    return this.request<T>(endpoint, "DELETE", config);
  };

  // ==========================================================================

  public async request<T>(endpoint: string, method: HttpMethod, config: HttpRequest): Promise<T> {
    const helper = new HttpHelper(config);

    const url = helper.buildURL(this.options.url, endpoint);
    let init = helper.buildRequest(method, this.options.headers);

    init = await this.interceptRequest(init);
    const response = await fetch(url, init);

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
    };

    const result: HttpResponse<T> = {
      data: await response.json(),
      status: response.status,
    };

    return (await this.interceptResponse(result)).data;
  };

  private async interceptRequest(request: RequestInit): Promise<RequestInit> {
    let result = request;
    for (const interceptor of this.options.interceptors) {
      if (interceptor.onRequest) result = await interceptor.onRequest(result);
    };

    return result;
  };

  private async interceptResponse<T>(response: HttpResponse<T>): Promise<HttpResponse<T>> {
    let result = response;
    for (const interceptor of this.options.interceptors) {
      if (interceptor.onResponse) result = await interceptor.onResponse(result);
    };

    return result;
  };
};

export const api = new HttpClient({
  url: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  interceptors: [AuthInterceptor],
});
