"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RecoilRoot} from "recoil";
import LoadingContainer from "../_portal/LoadingContainer";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <div>{children}</div>
        <LoadingContainer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
