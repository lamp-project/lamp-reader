export interface StrapiUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
}

export class Strapi {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly url: string = process.env.STRAPI_URL) {}

  public get user(): StrapiUser {
    return JSON.parse(localStorage.getItem('strapi_user'));
  }

  protected set user(value: StrapiUser) {
    localStorage.setItem('strapi_user', JSON.stringify(value));
  }

  public get token(): string {
    return localStorage.getItem('strapi_token');
  }

  protected set token(value: string) {
    localStorage.setItem('strapi_token', value);
  }

  protected request<RETURN_TYPE = any, BODY_TYPE = any>(
    path: string,
    body: BODY_TYPE,
    { headers, ...options }: RequestInit = {}
  ): Promise<RETURN_TYPE> {
    return fetch(`${this.url}/${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      ...options,
    }).then((res) => res.json());
  }

  protected authorisedRequest<RETURN_TYPE = any, BODY_TYPE = any>(
    path: string,
    body: BODY_TYPE,
    options: RequestInit = {}
  ): Promise<RETURN_TYPE> {
    return this.request<RETURN_TYPE, BODY_TYPE>(path, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      ...options,
    });
  }

  async login(identifier: string, password: string) {
    const { user, jwt } = await this.request<{ user: StrapiUser; jwt: string }>(
      'api/auth/local',
      {
        identifier,
        password,
      }
    );
    this.user = user;
    this.token = jwt;
    return user;
  }
}

export const strapi = new Strapi();
