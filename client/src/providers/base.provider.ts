import { api, HttpClient } from "@api/http.client";

export abstract class BaseProvider {
  protected readonly api: HttpClient = api;
};
