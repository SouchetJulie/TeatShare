import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import axios, { AxiosResponse } from "axios";

const userApiUrl = "/api/user";

/**
 * Gets the user data from the server API.
 *
 * @param {string} id The user's id.
 * @return {Promise<AxiosResponse<ApiResponse<{ user: IUserPublic }>>>} The user's data.
 */
const getUser = (
  id: string
): Promise<AxiosResponse<ApiResponse<{ user: IUserPublic }>>> =>
  axios.get<ApiResponse<{ user: IUserPublic }>>(`${userApiUrl}/${id}`);
export { getUser };
export { toggleBookmark };
/**
 * Sends a request to the server API to remove the given lesson from the current user's bookmark (as identified by its
 * session cookie).
 *
 * @param {string} lessonId The lesson to remove
 * @param {boolean} isAlreadyBookmarked Whether the lesson is already bookmarked
 * @return {Promise<AxiosResponse<ApiResponse>>} The server response
 */
const toggleBookmark = (
  lessonId: string,
  isAlreadyBookmarked: boolean
): Promise<AxiosResponse<ApiResponse>> => {
  if (isAlreadyBookmarked) {
    return axios.delete<ApiResponse>(`${userApiUrl}/bookmark/${lessonId}`);
  }
  return axios.post<ApiResponse>(`${userApiUrl}/bookmark/${lessonId}`);
};
