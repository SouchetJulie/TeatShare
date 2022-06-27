import { NextHandleFunction } from "connect";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Helper method to wait for a middleware to execute before continuing
 * And to throw an error when an error happens in a middleware.
 *
 * @param {NextApiRequest} req Request
 * @param {NextApiResponse} res Response
 * @param {NextHandleFunction} next Connect-compatible middleware
 * @return {Promise<never>} The result of the middleware (ignored)
 */
export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandleFunction
): Promise<never> =>
  new Promise((resolve, reject) => {
    next(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
