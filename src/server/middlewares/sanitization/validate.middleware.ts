import { runMiddleware } from "@middlewares/run-middleware.helper";
import { validationErrorResponse } from "@middlewares/sanitization/validation-error.response";
import { ApiResponse } from "@typing/api-response.interface";
import {
  matchedData,
  ValidationChain,
  validationResult,
} from "express-validator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
  ): Promise<void> => {
    console.log("[VALIDATE] Validating request:"); // TODO to delete
    console.log("req.body:", req.body); // TODO to delete
    console.log("req.query:", req.query); // TODO to delete

    // Apply all validations
    try {
      await Promise.allSettled(
        validationChains.map((validationChain: ValidationChain) =>
          runMiddleware(req, res, validationChain)
        )
      );
    } catch (e) {
      res.status(500).json({
        success: false,
        error: "Erreur lors de validation de la requête.",
      });
    }

    // Check if any failed
    const errors = validationResult(req);

    console.log("[VALIDATE] Errors:", errors.array()); // TODO to delete

    if (!errors.isEmpty()) {
      return validationErrorResponse(res, errors.array());
    }

    // If success, add the sanitized parameters to req.body
    if (typeof req.body !== "object") {
      req.body = {};
    }
    req.body.sanitized = matchedData(req);

    // Call the next handler
    handler(req, res);
  };
