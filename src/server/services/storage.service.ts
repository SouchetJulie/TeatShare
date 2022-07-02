import { cleanFileMetadata } from "@common/file.utils";
import { Storage } from "@google-cloud/storage";
import { CleanFile } from "@typing/clean-file.interface";
import { File } from "formidable";

if (!process.env.GCS_CREDENTIALS) {
  throw new Error("GCS_CREDENTIALS must be defined in environment");
}
if (!process.env.NEXT_PUBLIC_BUCKET_NAME) {
  throw new Error("NEXT_PUBLIC_BUCKET_NAME must be defined in environment");
}

const credentials = JSON.parse(process.env.GCS_CREDENTIALS);

const storage = new Storage({
  credentials: {
    client_email: credentials.client_email,
    client_id: credentials.client_id,
    private_key: credentials.private_key,
  },
  projectId: credentials.project_id,
});
const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;

const bucket = storage.bucket(bucketName);

/**
 * Uploads the given file to cloud storage.
 * @param {File} uploadFile File to upload
 * @param {string} uploadDirectory Where to store the file
 * @return {CleanFile} File metadata
 */
export const uploadFile = async (
  uploadFile: File,
  uploadDirectory: string
): Promise<CleanFile> => {
  const file = cleanFileMetadata(uploadFile);
  const destination = `${uploadDirectory}/${file.newFilename}`;
  await bucket.upload(file.filepath, {
    destination,
  });
  file.filepath = destination;
  return file;
};
