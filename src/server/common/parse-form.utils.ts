import { Fields, Files, IncomingForm, Part } from "formidable";
import { NextApiRequest } from "next";

export interface RequestFormData {
  fields?: Fields;
  files?: Files;
}

/**
 * Reads the form's value from the request and puts them into a Formidable object.
 * @param {NextApiRequest} req The incoming request.
 * @param {string[]} allowedFilesTypes (optional) Whitelist for file mimetypes. If none, block all files.
 * @return {Promise<RequestFormData>} The form's values.
 * @throws {Error} If the parsing fails.
 */
export const parseForm = (
  req: NextApiRequest,
  allowedFilesTypes?: string[]
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
          !!mimetype && !!allowedFilesTypes?.includes(mimetype), // keep only allowed file types
      });

      form.parse(req, (err, fields: Fields, files: Files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    }
  );