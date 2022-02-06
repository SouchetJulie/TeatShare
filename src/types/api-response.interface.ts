import {IUserPublic} from "@typing/user.interface";

export interface ApiResponse<DataType = unknown> {
  success: boolean;
  error?: string;
  data?: DataType
}

export interface ResourceApiResponse extends ApiResponse {
  id?: string;
}

export type UserApiResponse = ApiResponse<{ user: IUserPublic }>
