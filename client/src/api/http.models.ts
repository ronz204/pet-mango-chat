export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequest extends RequestInit{
  params?: Record<string, string | number>;
};

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
};

export interface HttpAction {
  endpoint: string;
  method: HttpMethod;
  config: HttpRequest;
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
