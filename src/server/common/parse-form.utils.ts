import { Fields, Files, IncomingForm, Part } from "formidable";
import { NextApiRequest } from "next";
import validator from "validator";
import isAlpha = validator.isAlpha;

/**
 * Object containing the data uploaded by a form after parsing by `formidable`.
 */
export interface RequestFormData {
  fields?: Fields;
  files?: Files;
}

/**
 * Reads the form's value from the request and puts them into a Formidable object.
 * @param {NextApiRequest} req The incoming request.
 * @param {RegExp} allowedFilesTypes (optional) Whitelist for file mimetypes. If none, block all files.
 * @return {Promise<RequestFormData>} The form's values.
 * @throws {Error} If the parsing fails.
 */
export const parseForm = (
  req: NextApiRequest,
  allowedFilesTypes?: RegExp
): Promise<RequestFormData> =>
  new Promise(
    (
      resolve: (value: { fields: Fields; files: Files }) => void,
      reject: (reason: Error) => void
    ) => {
      const form = new IncomingForm({
        keepExtensions: false,
        hashAlgorithm: "sha256",
        multiples: true,
        filter: ({ mimetype }: Part): boolean =>
          !!mimetype && !!allowedFilesTypes?.test(mimetype), // keep only allowed file types
      });

      form.parse(req, (err, fields: Fields, files: Files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    }
  );

/**
 * Copies the given data, with the fields equal to "", undefined or null removed.
 * @param {Record<string, any>} data Object to filter
 * @return {Record<string, any>} A filtered copy of the object
 */
export const removeEmptyFields = (data: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};
  Object.entries(data).forEach(([key, value]: [string, unknown]) => {
    if (value !== "" && value !== undefined && value !== null) {
      result[key] = value;
    }
  });
  return result;
};

/**
 * Validates that the given field :
 * - contains a single value
 * - respects the constraint as given by the validator function
 * The field is optional.
 *
 * @param {string | string[] | undefined} value Value to validate
 * @param {Function} validator Validating function
 * @param {string} errorMessage Error message to show in case the value is invalid
 * @return {string|undefined} The validated value
 * @throws {Error} If the value is invalid
 */
export const validateStringField = (
  value: string | string[] | undefined,
  validator: (s: string) => boolean,
  errorMessage: string
): string | undefined => {
  const valueExists = value !== undefined && value !== null && value !== "";
  if (!valueExists) return undefined;

  const valueIsArray = Array.isArray(value);
  const valueIsValid = !valueIsArray && validator(value);
  if (valueExists && !valueIsValid) {
    throw new Error(errorMessage);
  }
  return value;
};

/**
 * Validates that the given field :
 * - contains an array
 * - each member respects the constraint as given by the validator function
 * The field is optional.
 *
 * @param {string | string[] | undefined} value Value to validate
 * @param {Function} validator Validating function
 * @param {string} errorMessage Error message to show in case the value is invalid
 * @return {string[]|undefined} The validated value
 * @throws {Error} If the value is invalid
 */
export const validateArrayStringField = (
  value: string | string[] | undefined,
  validator: (s: string) => boolean,
  errorMessage: string
): string[] | undefined => {
  const valueExists = value !== undefined && value !== null && value !== "";
  if (!valueExists) return undefined;

  const arrayValue = Array.isArray(value) ? value : [value];
  const valueIsValid = arrayValue.every((item: string) => validator(item));
  if (valueExists && !valueIsValid) {
    throw new Error(errorMessage);
  }
  return arrayValue;
};

export const isFrenchAlpha = (s: string) => isAlpha(s, "fr-FR");
