import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  BASE_URL,
  MONO_SECRET_KEY,
  PAYMENT_BASE_URL,
} from "../../../configs/api";
import { getToken } from "../../../utils/storage";
import { errorHandler } from "../../../utils/errorHandler";
import { GenericObject } from "../../../interfaces";
import { ResponseDTO } from "../auth/auth.types";

const getMonoHeaders = () => {
  return {
    "mono-sec-key": MONO_SECRET_KEY,
    "Content-Type": "application/json",
  };
};

const authorizeMonoUser = async (payload: { code: string }) => {
  try {
    const response: GenericObject = await axios.post(
      `https://api.withmono.com/account/auth`,
      payload,
      {
        headers: getMonoHeaders(),
      }
    );

    return response?.data;
  } catch (error) {
    errorHandler(error, "An error occurred");
    throw error;
  }
};

export const getMonoUserData = async (payload: { code: string }) => {
  try {
    const authResponse: GenericObject = await authorizeMonoUser(payload);

    const userData = await axios.get(
      `https://api.withmono.com/accounts/${authResponse?.id}`,
      {
        headers: getMonoHeaders(),
      }
    );

    return userData?.data;
  } catch (error) {
    errorHandler(error, "An error occurred");
    return error;
  }
};

export const getMonoUserStatement = async (payload: { code: string }) => {
  try {
    const authResponse: GenericObject = await authorizeMonoUser(payload);
    console.log(authResponse);

    const userStatement = await axios.get(
      `https://api.withmono.com/v2/accounts/${authResponse?.id}/statement`,
      {
        headers: getMonoHeaders(),
      }
    );

    return userStatement?.data;
  } catch (error) {
    errorHandler(error, "An error occurred");
    return error;
  }
};

export const utilityApi = createApi({
  reducerPath: "utilityApi",
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
    getSupportedBanks: builder.query<any, void>({
      query: () => ({ url: "/v1/supported-banks" }),
      transformResponse: (response: ResponseDTO) => response?.banks,
    }),
  }),
});

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PAYMENT_BASE_URL,
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
    getBanks: builder.query<any, void>({
      query: () => ({ url: "/banks" }),
      transformResponse: (response: ResponseDTO) => response,
    }),
  }),
});

export const { useGetSupportedBanksQuery } = utilityApi;
export const { useGetBanksQuery } = paymentApi;
