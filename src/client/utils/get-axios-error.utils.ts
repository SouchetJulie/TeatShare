import { ApiErrorResponse } from "@typing/api-response.interface";
import { AxiosError } from "axios";

export const getAxiosErrorMessage = (
  error: AxiosError<ApiErrorResponse>
): string =>
  error.response?.data?.error || error.request?.responseText || error.message;
