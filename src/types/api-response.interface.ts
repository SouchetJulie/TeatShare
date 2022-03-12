import {IUserPublic} from "@typing/user.interface";
import {ILesson} from "@typing/lesson-file.interface";

export interface ApiResponse<DataType = unknown> {
  success: boolean;
  error?: string;
  data?: DataType
}

export interface SingleResourceApiResponse extends ApiResponse {
  id?: string;
}

export type UserApiResponse = ApiResponse<{ user: IUserPublic }>

export interface LessonsApiResponse extends ApiResponse {
  lessons: ILesson[];
}
