import type { HttpInterceptor } from "./http.models";

export const AuthInterceptor: HttpInterceptor = {
  onRequest: (request) => {
    const token = localStorage.getItem("token");
    if (!token) return request;

    return {
      ...request, headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
};
