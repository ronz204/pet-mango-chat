export type HttpConfig = RequestInit & {
  params?: Record<string, string | number>;
};

export class HttpBuilder {
  private readonly config: HttpConfig;

  constructor(config: HttpConfig) {
    this.config = config;
  };

  public buildUrl(baseUrl: string, endpoint: string) {
    const url = new URL(`${baseUrl}${endpoint}`);

    if (this.config.params) {
      Object.entries(this.config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    };

    return url.toString();
  };
};
