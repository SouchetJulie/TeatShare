export interface ApiResponse {
  success: boolean;
  error?: string;
}

export interface ResourceApiResponse extends ApiResponse {
  id?: string;
}
