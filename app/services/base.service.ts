type Params = Record<string, string | number | string[] | number[] | boolean>;

export class BaseService {
  protected readonly headers: Record<string, string>;

  constructor(protected readonly baseUrl: string) {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private buildRequestUrl(url: string, params?: Params) {
    const requestUrl = `${this.baseUrl}${url}`;

    if (!params) {
      return requestUrl;
    }

    return `${requestUrl}?${Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")}`;
  }

  async makeRequest<R = Record<string, unknown>>(
    url: string,
    options?: RequestInit & { params?: Params }
  ) {
    const urlTest = this.buildRequestUrl(url, options?.params);
    console.log("urlTest123", urlTest);
    const response = await fetch(this.buildRequestUrl(url, options?.params), {
      headers: this.headers,
      method: "GET",
      ...options,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as R;
  }
}
