interface ApiSuccessResponse<DataType = unknown> {
  success: true;
  data?: DataType;
}

interface ApiErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<DataType = unknown> =
  | ApiSuccessResponse<DataType>
  | ApiErrorResponse;

export type { ApiSuccessResponse, ApiErrorResponse, ApiResponse };
