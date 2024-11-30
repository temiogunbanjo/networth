import { BASE_URL } from "../../../configs/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getToken } from "../../../utils/storage";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Accept", `application/json`);
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, string>({
      query: () => ({ url: "/" }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
