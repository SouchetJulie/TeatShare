import { Fields, Files, IncomingForm, Part } from "formidable";
import { NextApiRequest } from "next";

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
        multiples: false,
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
