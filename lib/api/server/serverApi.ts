import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ServerFetchOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | undefined>;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/api`;

const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {},
) {
  const { method = 'GET', body, params } = options;
  const cookieStore = await cookies();

  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
    data: body,
  };

  try {
    const res: AxiosResponse<T> = await nextServer(config);

    if (res.status === 204) {
      return undefined as unknown as T;
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}
