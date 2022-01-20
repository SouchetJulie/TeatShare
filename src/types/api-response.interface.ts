import {IUserPublic} from "@typing/user.interface";

export interface ApiResponse {
  success: boolean;
  error?: string;
}

export interface ResourceApiResponse extends ApiResponse {
  id?: string;
}

export interface UserApiResponse extends ApiResponse {
  user: IUserPublic;
}
