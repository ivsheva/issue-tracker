"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </ReactQueryClientProvider>
  );
}
