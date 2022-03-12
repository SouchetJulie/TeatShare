import {IUserPublic} from "@typing/user.interface";
import {ILesson} from "@typing/lesson-file.interface";

export interface ApiResponse {
  success: boolean;
  error?: string;
}

export interface SingleResourceApiResponse extends ApiResponse {
  id?: string;
}

export interface UserApiResponse extends ApiResponse {
  user: IUserPublic;
}

export interface LessonsApiResponse extends ApiResponse {
  lessons: ILesson[];
}
