import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: AxiosError) =>
  error.response?.data.error || error.request || error.message;
