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

  const message = Object.entries(errorMap).map(
    ([param, { value, messages }]) => {
      let valueToDisplay: string;
      if (param === "password") {
        valueToDisplay = "";
        for (let i = 0; i < value.length; i++) {
          valueToDisplay += "●";
        }
      } else {
        valueToDisplay = value;
      }

      const allMessages: string = messages.join(", ");

      return `La valeur de "${param}" ("${valueToDisplay}") est invalide : ${allMessages}`;
    }
  );

  console.log(`[VALIDATION] Validation failed : ${message.join("\n")}`);

  return res.status(400).send(message.join(". "));
};
