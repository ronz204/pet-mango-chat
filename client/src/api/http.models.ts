export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type HttpParams = Record<string, string | number>;
export type HttpHeaders = Record<string, string>;

export interface HttpRequest extends RequestInit {
  params?: HttpParams;
  headers?: HttpHeaders;
};

export interface HttpResponse<Data> {
  data: Data;
  status: number;
};

export interface HttpInterceptor {
  onRequest?: (request: RequestInit) => RequestInit | Promise<RequestInit>;
  onResponse?: <T>(response: HttpResponse<T>) => HttpResponse<T> | Promise<HttpResponse<T>>;
};

export interface HttpClientOptions {
  url: string;
  headers: HttpHeaders;
  interceptors: HttpInterceptor[];
};
