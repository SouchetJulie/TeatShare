import { ApiErrorResponse } from "@typing/api-response.interface";
import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError<ApiErrorResponse>) =>
  error.response?.data?.error ||
  error.response?.data ||
  error.request ||
  error.message ||
  error;
