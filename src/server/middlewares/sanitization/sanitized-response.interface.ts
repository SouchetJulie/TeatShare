import { NextApiResponse } from "next";

/**
 * A NextApiResponse with a sanitized attribute, containing the parameters from the request after validation.
 */
export type ISanitizedResponse<T = unknown> = NextApiResponse & {
  sanitized: T;
};
