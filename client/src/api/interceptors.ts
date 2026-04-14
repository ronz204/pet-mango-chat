import type { HttpInterceptor } from "./http.models";

export const AuthInterceptor: HttpInterceptor = {
  onRequest: (request) => {
    const token = localStorage.getItem("mango:token");
    if (!token) return request;

    return {
      ...request, headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
};

export const BodyInterceptor: HttpInterceptor = {
  onRequest: (request) => {
    if (!request.body) return request;

    return {
      ...request,
      body: JSON.stringify(request.body),
    };
  },
};
