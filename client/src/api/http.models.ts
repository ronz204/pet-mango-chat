export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Request = Omit<RequestInit, "method" | "body">;

export interface HttpConfig extends Request{
  params?: Record<string, string | number>;
  body?: Record<string, unknown> | object;
};

export interface HttpAction {
  endpoint: string;
  method: HttpMethod;
  config: HttpConfig;
};

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
};

type RequestReturn = RequestInit | Promise<RequestInit>;
type ResponseReturn<T> = HttpResponse<T> | Promise<HttpResponse<T>>;

export interface HttpInterceptor {
  onRequest?: (request: RequestInit) => RequestReturn;
  onResponse?: <T>(response: HttpResponse<T>) => ResponseReturn<T>;
};

export interface HttpClientConfig {
  url: string;
  headers: HeadersInit;
  interceptors: HttpInterceptor[];
};
