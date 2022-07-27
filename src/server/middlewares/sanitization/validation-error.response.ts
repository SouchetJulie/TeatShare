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
      console.log(param, value, messages); // TODO to delete

      let valueToDisplay: string;
      if (param === "password") {
        valueToDisplay = "";
        for (let i = 0; i < value.length; i++) {
          valueToDisplay += "●";
        }
      } else {
        valueToDisplay = value;
      }

      const message: string = messages.join(", ");

      return `La valeur de "${param}" ("${valueToDisplay}") est invalide : ${message}`;
    }
  );

  return res.status(400).send(message.join(". "));
};
