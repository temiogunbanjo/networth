import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/api";
import { GenericObject } from "../../../interfaces";
import {
  LoanStatusUpdatePayload,
  GetBusinessQueryParams,
} from "./business.types";
import { ResponseDTO } from "../auth/auth.types";
import { errorHandler } from "../../../utils/errorHandler";
import { getToken } from "../../../utils/storage";
import { convertToFormData, createQuery } from "../../../utils/utility";

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set("Accept", `application/json`);
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSingleBusiness: builder.query<any, string>({
      query: (uuid) => ({ url: `/v1/admin/loans/single/${uuid}` }),
      transformResponse: (response: ResponseDTO) => {
        return response?.loan;
      },
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;

        try {
          await queryFulfilled;
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    getBusinesses: builder.query<any, GetBusinessQueryParams>({
      query: (queryParams) => ({
        url: `/v1/admin/business/all${createQuery(queryParams)}`,
      }),
      transformResponse: (response: ResponseDTO) => {
        return response?.businesses;
      },
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;

        try {
          await queryFulfilled;
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    updateLoanStatus: builder.mutation<GenericObject, LoanStatusUpdatePayload>({
      query: (payload) => {
        const formDataPayload = convertToFormData(payload);
        return {
          method: "POST",
          url: "/v1/admin/loans/update-status",
          body: formDataPayload,
        };
      },
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => {
        return error;
      },
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled, requestId } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          console.log({ responseData, requestId });
          // setToken(responseData?.token);
          // notify("Login success", { type: "success" });
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
  }),
});

export const {
  useGetSingleBusinessQuery,
  useUpdateLoanStatusMutation,
  useGetBusinessesQuery,
} = businessApi;
