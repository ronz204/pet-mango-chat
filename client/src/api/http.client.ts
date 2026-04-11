import type { 
  HttpAction,
  HttpResponse,
  HttpClientConfig,
} from "./http.models";

import { HttpHelper } from "./http.helper";

export class HttpClient {
  private readonly config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
  };

  public async request<T>(action: HttpAction): Promise<T> {
    const helper = new HttpHelper(action);

    const url = helper.buildURL(this.config.url);
    let init = helper.buildInit(this.config.headers);

    init = await this.interceptRequest(init);
    const response = await fetch(url, init);

    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
    };

    const result: HttpResponse<T> = {
      data: await response.json(),
      status: response.status,
      headers: response.headers,
    };

    return (await this.interceptResponse(result)).data;
  };

  private async interceptRequest(init: RequestInit): Promise<RequestInit> {
    let result: RequestInit = init;

    for (const interceptor of this.config.interceptors) {
      if (interceptor.onRequest) result = await interceptor.onRequest(result);
    };

    return result;
  };

  private async interceptResponse<T>(response: HttpResponse<T>): Promise<HttpResponse<T>> {
    let result: HttpResponse<T> = response;
    
    for (const interceptor of this.config.interceptors) {
      if (interceptor.onResponse) result = await interceptor.onResponse(result);
    };

    return result;
  };
};
