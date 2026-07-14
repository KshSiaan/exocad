export const base_api = "/api";
export const base_url =
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

function getToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return (
    document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1] ?? undefined
  );
}

interface HowlOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
}

/** JSON API calls */
export async function howl<T>(
  endpoint: string,
  { method = "GET", body, token, headers = {} }: HowlOptions = {}
): Promise<T> {
  const resolvedToken = token ?? getToken();

  const url = `${base_url}${base_api}${endpoint}`;
const requestOptions: RequestInit = {
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(resolvedToken ? { Authorization: `Bearer ${resolvedToken}` } : {}),
    ...headers,
  },
  body: body !== undefined ? JSON.stringify(body) : undefined,
};

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      let errorMessage = "Request failed";
      try {
        const err = await res.json();
        errorMessage = (err as { message?: string }).message ?? errorMessage;
      } catch {
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json() as Promise<T>;
    } else {
      const text = await res.text();
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Request failed");
  }
}

interface ProwlOptions {
  method?: "POST" | "PUT" | "PATCH";
  body: FormData;
  token?: string;
  headers?: Record<string, string>;
}

/** FormData API calls */
export async function prowl<T>(
  endpoint: string,
  { method = "POST", body, token, headers = {} }: ProwlOptions
): Promise<T> {
  const resolvedToken = token ?? getToken();

  const res = await fetch(`${base_url}${base_api}${endpoint}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(resolvedToken ? { Authorization: `Bearer ${resolvedToken}` } : {}),
      ...headers,
    },
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? "Request failed");
  }

  return res.json() as Promise<T>;
}
