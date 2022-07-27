import { ValidationError } from "express-validator";
import { NextApiResponse } from "next";

/**
 * Converts the validation errors to a readable format
 * @param {NextApiResponse} res
 * @param {ValidationError[]} errors
 * @return {void}
 */
export const validationErrorResponse = (
  res: NextApiResponse,
  errors: ValidationError[]
): void => {
  const errorMap: {
    [k: string]: {
      value: string;
      messages: string[];
    };
  } = {};

  // Group all error messages by parameter
  errors.forEach((error: ValidationError) => {
    if (!errorMap[error.param]) {
      errorMap[error.param] = {
        value: error.value,
        messages: [],
      };
    }
    errorMap[error.param].messages.push(error.msg);
  });

  console.log("[VALIDATE] Error map:", errorMap); // TODO to delete

  const message = Object.entries(errorMap).map(
    ([param, { value, messages }]) => {
      const valueToDisplay =
        param === "password" ? value.replaceAll(/./g, "●") : value;
      return `La valeur de "${param}" ("${valueToDisplay}") est invalide : ${messages.join(
        ", "
      )}`;
    }
  );

  return res.status(400).send(message.join(". "));
};
