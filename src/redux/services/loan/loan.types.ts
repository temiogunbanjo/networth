import { LOAN_STATUSES } from "../../../pages/loans/shared/constants";

export type LoanApplicationPayload = {};

export type CalculateInterestPayload = {};

export type LoanStatusUpdatePayload = {
  uuid: string;
  comment?: string;
  status: LOAN_STATUSES | string;
  comment_document?: File | string;
};

export type DocumentUploadPayload = {
  document: File | string;
};

export type GetLoanQueryParams = {
  page: number;
  limit: number;
  type?: string;
};
