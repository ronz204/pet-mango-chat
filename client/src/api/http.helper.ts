import type { HttpAction } from "./http.models";

export class HttpHelper {
  private readonly action: HttpAction;

  constructor(action: HttpAction) {
    this.action = action;
  };

  public buildURL(baseURL: string): string {
    const url = new URL(`${baseURL}${this.action.endpoint}`);
    this.addParams(url);
    return url.toString();
  };

  public addParams(url: URL): void {
    if (!this.action.config.params) return;

    Object.entries(this.action.config.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  };

  public buildHeaders(headers: HeadersInit): HeadersInit {
    return { ...headers, ...this.action.config.headers };
  };

  public buildInit(headers: HeadersInit): RequestInit {
    const { params: _params, ...rest } = this.action.config;

    return {
      ...(rest as RequestInit),
      method: this.action.method,
      headers: this.buildHeaders(headers)
    };
  };
};
