import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError) =>
  error.response?.data?.error ||
  error.response?.data ||
  error.request ||
  error.message ||
  error;
