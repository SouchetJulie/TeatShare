import { ValidationError } from "express-validator";
import { NextApiResponse } from "next";

export const validationErrorResponse = (
  res: NextApiResponse,
  errors: ValidationError[]
) => {
  // Converts the errors to a readable format
  const errorMap: {
    [k: string]: {
      value: string;
      messages: string[];
    };
  } = {};

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
    ([param, { value, messages }]) =>
      `La valeur de "${param}" ("${value}") est invalide : ${messages.join(
        ", "
      )}`
  );

  return res.status(400).send(message.join(". "));
};
