import { GenericObject } from "../../../interfaces";

export type AuthQuery = {};

export type ResponseDTO = GenericObject & { data: any };

export type RegisterProfilePayload = {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
};

export type RegisterBusinessPayload = {
  business_name: string;
  commodities: string[];
  session: string;
};

export type RegisterPasswordPayload = {
  session: string;
  password: string;
  confirm_password: string;
};

export type VerifyOTPPayload = {
  token: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  user?: "client" | "admin" | "bank" | string,
};

export type ResetForgottenPasswordPayload = {
  email: string;
};

export type CompleteForgottenPasswordResetPayload = {
  otp: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type ResendTokenPayload = Pick<RegisterProfilePayload, "email">;

export type UpdatePasswordPayload = {
  current_password: string;
  new_password: string;
  // new_password_confirmation: string;
};

export type SetupPinPayload = {
  pin?: string;
  pin_confirmation?: string;
};

export type UpdateProfilePayload = {};
