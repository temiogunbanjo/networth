// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  clearStorage,
  setAuthUser,
  setToken,
  setRole,
  getRole,
  getToken,
} from "../../../utils/storage";

import type {
  ResponseDTO,
  LoginPayload,
  SetupPinPayload,
  VerifyOTPPayload,
  ResendTokenPayload,
  UpdateProfilePayload,
  UpdatePasswordPayload,
  RegisterProfilePayload,
  RegisterBusinessPayload,
  RegisterPasswordPayload,
  ResetForgottenPasswordPayload,
  CompleteForgottenPasswordResetPayload,
} from "./auth.types";

import { AUTH_URL, BASE_URL } from "../../../configs/api";
import { GenericObject } from "../../../interfaces";
import { errorHandler } from "../../../utils/errorHandler";
import { notify } from "../../../utils/toastNotification";
import { convertToFormData } from "../../../utils/utility";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL,
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
    login: builder.mutation<GenericObject, LoginPayload>({
      query: (payload) => ({ url: "/v3/login", method: "POST", body: payload }),
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => {
        console.log("meta", error);
        return error;
      },
      async onQueryStarted(payload, apiHelpers) {
        const { dispatch, queryFulfilled } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          setToken(responseData?.token);
          setRole(payload?.user!);
          notify("Login success", { type: "success" });

          // Get user profile
          const profileRes = await dispatch(
            authApi.endpoints.getUserProfile.initiate()
          );
          // console.log(profileRes);
          if (!profileRes?.error) {
            window.location.href =
              payload?.user === "admin" ? "/dashboard/admin" : "/dashboard";
          }
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    loginAdmin: builder.mutation<GenericObject, LoginPayload>({
      query: (payload) => ({ url: "/v3/login", method: "POST", body: payload }),
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => {
        console.log("meta", error);
        return error;
      },
      async onQueryStarted(payload, apiHelpers) {
        const { dispatch, queryFulfilled } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          setToken(responseData?.token);
          setRole(payload?.user!);
          notify("Login success", { type: "success" });

          // Remove later
          // if (!responseData?.error) {
          //   window.location.href =
          //     payload?.user === "admin" ? "/dashboard/admin" : "/dashboard";
          // }

          // Get user profile
          const profileRes = await dispatch(
            authApi.endpoints.getAdminProfile.initiate()
          );
          console.log(profileRes);
          if (!profileRes?.error) {
            window.location.href =
              payload?.user === "admin" ? "/dashboard/admin" : "/dashboard";
          }
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    loginBank: builder.mutation<GenericObject, LoginPayload>({
      query: (payload) => ({ url: "/v3/login", method: "POST", body: payload }),
      transformResponse: (response: ResponseDTO) => response,
      transformErrorResponse: (error: any) => {
        console.log("meta", error);
        return error;
      },
      async onQueryStarted(payload, apiHelpers) {
        const { dispatch, queryFulfilled } = apiHelpers;

        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          setToken(responseData?.token);
          setRole("bank");
          notify("Login success", { type: "success" });

          // Remove later
          // if (!responseData?.error) {
          //   window.location.href =
          //     payload?.user === "admin" ? "/dashboard/admin" : "/dashboard";
          // }

          // Get user profile
          const profileRes = await dispatch(
            authApi.endpoints.getBankingPartnerProfile.initiate()
          );
          console.log(profileRes);
          if (!profileRes?.error) {
            window.location.href = "/dashboard/banking-partner";
          }
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    register: builder.mutation<GenericObject, RegisterProfilePayload>({
      query: (payload) => ({
        url: `/v1/project-grow/register`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { extra, requestId, queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;

          notify("Registration success", { type: "success" });
          // console.log({ responseData, payload, requestId });
          console.log({
            payload,
            extra,
            requestId,
            queryFulfilled,
            responseData,
          });
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
    registerBusiness: builder.mutation<GenericObject, RegisterBusinessPayload>({
      query: (payload) => ({
        url: `/v1/project-grow/storeBusinessInfo`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { extra, requestId, queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;

          notify("Added business profile successfully", { type: "success" });
          // console.log({ responseData, payload, requestId });
          console.log({
            payload,
            extra,
            requestId,
            queryFulfilled,
            responseData,
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    registerPassword: builder.mutation<GenericObject, RegisterPasswordPayload>({
      query: (payload) => ({
        url: `/v1/project-grow/savePassword`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { extra, requestId, queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;

          notify("Registration success", { type: "success" });
          // console.log({ responseData, payload, requestId });
          console.log({
            extra,
            requestId,
            responseData,
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    setupPin: builder.mutation<GenericObject, SetupPinPayload>({
      query: (payload) => ({
        url: `/auth/create-pin`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
        } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          console.log({ payload, extra, requestId, queryFulfilled });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    verifyOTP: builder.mutation<GenericObject, VerifyOTPPayload>({
      query: (payload) => ({
        url: `/v1/project-grow/validateToken`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { extra, requestId, queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          console.log({ payload, extra, requestId, queryFulfilled });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    verifyUser: builder.mutation<GenericObject, ResetForgottenPasswordPayload>({
      query: (payload) => ({
        url: `/v1/project-grow/validateToken`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { extra, requestId, queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          // console.log({ responseData, payload, requestId });
          console.log({
            payload,
            extra,
            requestId,
            queryFulfilled,
            responseData,
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    resendVerificationMail: builder.mutation<GenericObject, ResendTokenPayload>(
      {
        query: (payload) => ({
          url: `/v1/project-grow/resendToken`,
          method: "POST",
          body: payload,
        }),
        transformResponse: (response: ResponseDTO) => response,
        async onQueryStarted(payload, apiHelpers) {
          const { requestId, queryFulfilled } = apiHelpers;
          try {
            await queryFulfilled;
            console.log({ payload, requestId });

            setAuthUser({
              email: payload.email,
            });
          } catch (error) {
            errorHandler(error);
            console.error(error);
          }
        },
      }
    ),
    migrateExistingUser: builder.mutation<GenericObject, ResendTokenPayload>({
      query: (payload) => ({
        url: `/v1/project-grow/migrate-existing-user`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { requestId, queryFulfilled } = apiHelpers;
        try {
          await queryFulfilled;
          console.log({ payload, requestId });

          setAuthUser({
            email: payload.email,
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    getSession: builder.mutation<GenericObject, { email: string }>({
      query: (payload) => ({
        url: `/v1/project-grow/getSession`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          setAuthUser({
            ...(responseData?.data ?? {}),
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    resetForgottenPassword: builder.mutation<
      GenericObject,
      ResetForgottenPasswordPayload
    >({
      query: (payload) => ({
        url: `/v1/project-grow/password/forgot`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          await queryFulfilled;
          setAuthUser({
            email: payload.email,
          });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    completePasswordReset: builder.mutation<
      GenericObject,
      CompleteForgottenPasswordResetPayload
    >({
      query: (payload) => ({
        url: `/v1/project-grow/password/reset`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          await queryFulfilled;
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    modifyPassword: builder.mutation<GenericObject, UpdatePasswordPayload>({
      query: (payload) => ({
        url: `/v3/account/change/password`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(payload, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          console.log({ responseData });
          notify("Password updated", { type: "success" });
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    getUserProfile: builder.query<ResponseDTO, void>({
      query: () => `${BASE_URL}/v1/get-company-details`,
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          setAuthUser(responseData);
          // console.log(responseData);
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    getAdminProfile: builder.query<ResponseDTO, void>({
      query: () => ({ method: "GET", url: `${BASE_URL}/v1/admin/user` }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          setAuthUser(responseData);
          // console.log(responseData);
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    getBankingPartnerProfile: builder.query<ResponseDTO, void>({
      query: () => ({ method: "GET", url: `${BASE_URL}/v1/admin/user` }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          setAuthUser(responseData);
          // console.log(responseData);
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    getAdminProfile1: builder.mutation<ResponseDTO, void>({
      query: () => ({ method: "POST", url: `${BASE_URL}/v1/admin/user` }),
      transformResponse: (response: ResponseDTO) => response,
      async onQueryStarted(_, apiHelpers) {
        const { queryFulfilled } = apiHelpers;
        try {
          const { data: responseData } = await queryFulfilled;
          setAuthUser(responseData);
          // console.log(responseData);
        } catch (error) {
          errorHandler(error);
          console.error(error);
        }
      },
    }),
    updateUserProfile: builder.mutation<GenericObject, UpdateProfilePayload>({
      query: (payload) => {
        console.log(payload);
        const formDataPayload = convertToFormData(payload);
        return {
          url: `${BASE_URL}/v1/update-company-details`,
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
        } catch (error) {
          errorHandler(error);
        }
      },
    }),
  }),
});

export const logout = () => {
  const role = getRole();
  const loginPage: GenericObject = {
    client: "/login",
    admin: "/admin-login",
    bank: "/bank-login",
  };
  window.location.href = loginPage[role];
  clearStorage();
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserProfileQuery,
  useGetAdminProfileQuery,
  useGetBankingPartnerProfileQuery,
  useGetAdminProfile1Mutation,
  useUpdateUserProfileMutation,
  useGetSessionMutation,
  useLoginMutation,
  useLoginAdminMutation,
  useLoginBankMutation,
  useRegisterMutation,
  useRegisterBusinessMutation,
  useRegisterPasswordMutation,
  useModifyPasswordMutation,
  useVerifyUserMutation,
  useVerifyOTPMutation,
  useSetupPinMutation,
  useMigrateExistingUserMutation,
  useResetForgottenPasswordMutation,
  useCompletePasswordResetMutation,
  useResendVerificationMailMutation,
} = authApi;
