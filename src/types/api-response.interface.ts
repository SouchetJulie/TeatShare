export interface ApiResponse<DataType = unknown> {
  success: boolean;
  error?: string;
  data?: DataType;
}
