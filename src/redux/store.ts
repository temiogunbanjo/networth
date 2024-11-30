import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth/auth.service";
import { loanApi } from "./services/loan/loan.service";
import { businessApi } from "./services/business/business.service";
import { utilityApi, paymentApi } from "./services/utility/utility.service";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [loanApi.reducerPath]: loanApi.reducer,
    [utilityApi.reducerPath]: utilityApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(loanApi.middleware)
      .concat(utilityApi.middleware)
      .concat(paymentApi.middleware)
      .concat(businessApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
