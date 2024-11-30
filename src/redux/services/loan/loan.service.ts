import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/api";
import { GenericObject } from "../../../interfaces";
import {
  LoanApplicationPayload,
  CalculateInterestPayload,
  LoanStatusUpdatePayload,
  GetLoanQueryParams,
  DocumentUploadPayload,
} from "./loan.types";
import { ResponseDTO } from "../auth/auth.types";
import { errorHandler } from "../../../utils/errorHandler";
import { getToken } from "../../../utils/storage";
import { convertToFormData, createQuery } from "../../../utils/utility";

export const loanApi = createApi({
  reducerPath: "loanApi",
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
    getSingleLoan: builder.query<any, string>({
      query: (uuid) => ({ url: `/v1/loans/single/${uuid}` }),
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
    getSingleLoanForAdmin: builder.query<any, string>({
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
    getSingleLoanForBankingPartner: builder.query<any, string>({
      query: (uuid) => ({ url: `/v1/admin/banking/loans/single/${uuid}` }),
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
    getLoanHistory: builder.query<any, GetLoanQueryParams>({
      query: (queryParams) => ({
        url: `/v1/loan/all${createQuery(queryParams)}`,
      }),
      transformResponse: (response: ResponseDTO) => {
        return response?.loans;
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
    getLoanHistoryForAdmin: builder.query<any, GetLoanQueryParams>({
      query: (queryParams) => ({
        url: `/v1/admin/loans/get${createQuery(queryParams)}`,
      }),
      transformResponse: (response: ResponseDTO) => {
        console.log({ response });
        return response?.loans;
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
    getLoanHistoryForBankingPartner: builder.query<any, GetLoanQueryParams>({
      query: (queryParams) => ({
        url: `/v1/admin/banking/loans/get${createQuery(queryParams)}`,
      }),
      transformResponse: (response: ResponseDTO) => {
        console.log({ response });
        return response?.loans;
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
    calculateInterest: builder.mutation<
      GenericObject,
      CalculateInterestPayload
    >({
      query: (payload) => ({
        url: "/v1/loan/calculate-rate",
        method: "POST",
        body: payload,
      }),
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
    applyForLoan: builder.mutation<GenericObject, LoanApplicationPayload>({
      query: (payload) => {
        console.log(payload);
        const formDataPayload = convertToFormData(payload);
        return {
          url: "/v1/loan/apply",
          method: "POST",
          body: formDataPayload,
        };
      },
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => {
        console.log("meta", error);
        return error;
      },
      async onQueryStarted(payload, apiHelpers) {
        const { queryFulfilled, requestId } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          console.log({ responseData, payload, requestId });
          // setToken(responseData?.token);
          // notify("Login success", { type: "success" });
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
    uploadDocument: builder.mutation<GenericObject, DocumentUploadPayload>({
      query: (payload) => {
        console.log(payload);
        const formDataPayload = convertToFormData(payload);
        return {
          url: "/v1/upload",
          method: "POST",
          body: formDataPayload,
        };
      },
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => error,
      async onQueryStarted(payload, apiHelpers) {
        const { queryFulfilled, requestId } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          console.log({ responseData, payload, requestId });
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
  useGetSingleLoanQuery,
  useGetLoanHistoryQuery,
  useApplyForLoanMutation,
  useUploadDocumentMutation,
  useUpdateLoanStatusMutation,
  useCalculateInterestMutation,
  useGetSingleLoanForAdminQuery,
  useGetLoanHistoryForAdminQuery,
  useGetSingleLoanForBankingPartnerQuery,
  useGetLoanHistoryForBankingPartnerQuery,
} = loanApi;
