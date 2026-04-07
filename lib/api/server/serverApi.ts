import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/api`;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface ServerFetchOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | undefined>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
}

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {},
): Promise<T> {
  const { method = "GET", body, params, cache, tags, revalidate } = options;

  const cookieStore = await cookies();

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) searchParams.set(key, value);
    }
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }

  const headers: Record<string, string> = {
    Cookie: cookieStore.toString(),
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const nextOptions =
    tags !== undefined || revalidate !== undefined
      ? {
          next: {
            ...(tags !== undefined ? { tags } : {}),
            ...(revalidate !== undefined ? { revalidate } : {}),
          },
        }
      : {};

  const hasNextOptions = tags !== undefined || revalidate !== undefined;

  const fetchOptions: RequestInit = {
    method,
    headers,
    cache: hasNextOptions ? cache : (cache ?? "no-store"),
    ...nextOptions,
  };

  if (body !== undefined) {
    fetchOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
