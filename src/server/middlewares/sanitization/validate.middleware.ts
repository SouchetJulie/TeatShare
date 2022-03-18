import { NextFunction, NextHandleFunction } from "connect";
import { NextApiRequest } from "next";
import { matchedData, validationResult } from "express-validator";
import { validationErrorResponse } from "@middlewares/sanitization/validation-error.response";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";

export const validateMiddleware: NextHandleFunction = (
  req: NextApiRequest,
  res: ISanitizedResponse,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  res.sanitized = matchedData(req);

  next();
};
