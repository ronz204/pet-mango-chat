import type { HttpRequest, HttpParams, HttpHeaders, HttpMethod } from "./http.models";

export class HttpHelper {
  private readonly config: HttpRequest;

  constructor(config: HttpRequest) {
    this.config = config;
  };

  public buildURL(baseUrl: string, endpoint: string): string {
    const url = new URL(`${baseUrl}${endpoint}`);
    this.addParams(url, this.config.params);
    return url.toString();
  };

  private addParams(url: URL, params?: HttpParams): void {
    if (!params) return;

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    };
  };

  private buildHeaders(headers: HttpHeaders): HttpHeaders {
    return { ...headers, ...this.config.headers };
  };

  public buildRequest(method: HttpMethod, headers: HttpHeaders): RequestInit {
    const { params: _params, headers: _headers, ...rest } = this.config;
    return { method, headers: this.buildHeaders(headers), ...rest };
  };
};
