import { runMiddleware } from "@common/run-middleware.helper";
import { validationErrorResponse } from "@middlewares/sanitization/validation-error.response";
import {
  matchedData,
  ValidationChain,
  validationResult,
} from "express-validator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sendError } from "next/dist/server/api-utils";

/**
 * Next API middleware for completing the validation process,
 * before calling the actual handler.
 *
 * @param {ValidationChain[]} validationChains
 * @param {NextApiHandler} handler
 * @return {NextApiHandler}
 */
export const validate =
  (validationChains: ValidationChain[], handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // Apply all validations
    try {
      await Promise.all(
        validationChains.map((validationChain: ValidationChain) =>
          runMiddleware(req, res, validationChain)
        )
      );
    } catch (e) {
      sendError(
        res,
        500,
        "Le traitement de la requête a échoué. Veuillez réessayer ou contacter un administrateur."
      );
    }

    // Check if any failed
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return validationErrorResponse(res, errors.array());
    }

    // If success, add the sanitized parameters to req.body
    if (typeof req.body !== "object") {
      req.body = {};
    }
    req.body.sanitized = matchedData(req);

    handler(req, res);
  };
