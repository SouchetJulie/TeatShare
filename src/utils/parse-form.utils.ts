import validator from "validator";
import isAlpha = validator.isAlpha;

/**
 * Copies the given data, with the fields equal to "", undefined or null removed.
 * @param {Record<string, any>} data Object to filter
 * @return {Record<string, any>} A filtered copy of the object
 */
const removeEmptyFields = <T extends Record<string, unknown>>(data: T): T => {
  const result: T = {} as T;
  Object.entries(data).forEach(([key, value]: [keyof T, unknown]) => {
    if (valueExists(value)) {
      result[key] = value as typeof data[keyof T];
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
 * @param {boolean} isOptional Whether the field is optional
 * @return {string|undefined} The validated value
 * @throws {Error} If the value is invalid
 */
const validateStringField = (
  value: string | string[] | undefined,
  validator: (s: string) => boolean,
  errorMessage: string,
  isOptional = true
): string | undefined => {
  if (!valueExists(value)) {
    if (isOptional) {
      return undefined;
    }
    throw new Error(errorMessage + " (obligatoire)");
  }

  const valueIsArray = Array.isArray(value);
  const valueIsValid = !valueIsArray && validator(value);
  if (valueExists(value) && !valueIsValid) {
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
const validateArrayStringField = (
  value: string | string[] | undefined,
  validator: (s: string) => boolean,
  errorMessage: string
): string[] => {
  if (!valueExists(value)) {
    return [];
  }

  const arrayValue: string[] = toArray(value);
  const valueIsValid = arrayValue.every((item: string) => validator(item));
  if (valueExists(value) && !valueIsValid) {
    throw new Error(errorMessage);
  }
  return arrayValue;
};
const valueExists = <T extends unknown>(value: T | undefined): value is T =>
  value !== undefined && value !== null && value !== "";
/**
 * Make sure the given value is an array of strings.
 *
 * @param {string | string[]} value
 * @return {string[]}
 */
const toArray = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : [value];
const isFrenchAlpha = (s: string) => isAlpha(s, "fr-FR");
const isText = (s: string) => /^[A-Za-zÀ-ÖØ-öø-ÿ\d\s.;,:!?()\[\]'-]*$/.test(s);

export {
  isText,
  isFrenchAlpha,
  toArray,
  valueExists,
  validateArrayStringField,
  validateStringField,
  removeEmptyFields,
};
