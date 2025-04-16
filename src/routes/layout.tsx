import { component$, Slot, useContextProvider, useSignal, useStore } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { RefetchContext } from "~/components/context/refreshContext";
import { globalStoreContext, globalStoreTypes } from "~/components/context/store/globalStore";

export const onGet: RequestHandler = async ({ cacheControl, cookie, redirect, url }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });

  // Allow public access to the translate API route
  if (url.pathname.startsWith("/api/translate")) {
    return; // Skip the auth check and continue to the API logic
  }
  // Allow public access to auth pages
  if (url.pathname.startsWith("/auth")) {
    console.log("Public auth route, skipping auth check.");
    return;
  }

  // Read auth_token from cookies
  const authToken = cookie.get("auth_token");

  if (!authToken) {
    throw redirect(302, "/auth");
  } 
};

export default component$(() => {
  const saleRefetch = useSignal(false);
  const productRefetch = useSignal(false);
  const customerRefetch = useSignal(false);
  const qrCodeRefetch =  useSignal(false);
  const supplierRefetch = useSignal(false);
  const categoryRefetch = useSignal(false);

  // Provide all signals as a grouped context
  useContextProvider(RefetchContext, {
    saleRefetch,
    productRefetch,
    customerRefetch,
    qrCodeRefetch,
    supplierRefetch,
    categoryRefetch
  });

  // globalStore
const globalStore = useStore<globalStoreTypes>({
  profitPerProduct: [] // This is an array, matching the interface
});

// Provide the store using the context provider
useContextProvider(globalStoreContext, globalStore);


  return <Slot />;
});
