export type LoginPayload = {
  mobile: string;
  password: string;
};

export type RegisterPayload = {
  mobile: string;
};

export type ResetPasswordPayload = {
  mobile: string;
};

export type CompleteResetPasswordPayload = {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
