"use client";
import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
export default function GodProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";
  const queryClient = new QueryClient();
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense>{children}</Suspense>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </CookiesProvider>
  );
}
