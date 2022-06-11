import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";

/**
 * Gets the user data from the server API.
 *
 * @param {string} id The user's id.
 * @return {Promise<AxiosResponse<ApiResponse<{ user: IUserPublic }>>>} The user's data.
 */
const getUser = (
  id: string
): Promise<AxiosResponse<ApiResponse<{ user: IUserPublic }>>> =>
  axios.get<ApiResponse<{ user: IUserPublic }>>(`/api/user/${id}`);

export { getUser };
