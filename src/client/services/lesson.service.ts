import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@typing/api-response.interface";

const lessonApiUrl = "/api/lesson";

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
  if (isAlreadyBookmarked)
    return axios.delete<ApiResponse>(`${lessonApiUrl}/${lessonId}`);
  return axios.post<ApiResponse>(`${lessonApiUrl}/${lessonId}`);
};

export { toggleBookmark };
