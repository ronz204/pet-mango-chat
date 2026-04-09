import { api, HttpClient } from "./http.client";

export abstract class BaseProvider {
  protected readonly api: HttpClient = api;
};
