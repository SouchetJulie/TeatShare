import { Fields, Files, IncomingForm, Part } from "formidable";
import { NextApiRequest } from "next";

/**
 * Object containing the data uploaded by a form after parsing by `formidable`.
 */
interface RequestFormData {
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
const parseForm = (
  req: NextApiRequest,
  allowedFilesTypes?: RegExp
): Promise<RequestFormData> =>
  new Promise(
    (
      resolve: (value: { fields: Fields; files: Files }) => void,
      reject: (reason: Error) => void
    ) => {
      const form = new IncomingForm({
        maxFileSize: 1024 * 1024 * 4.4, // = 4.4 MB, since Vercel's serverless functions payloads are limited to 4.5MB
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

export { parseForm };
export type { RequestFormData };
