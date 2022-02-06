import { File } from "formidable";
import { CleanFile } from "@typing/clean-file.interface";

/**
 * Returns a new File with only the relevant metadata.
 * @param {File} file
 * @return {File}
 */
export const cleanFileMetadata = (file: File): CleanFile => ({
  filepath: file.filepath,
  hash: file.hash,
  hashAlgorithm: file.hashAlgorithm,
  mimetype: file.mimetype,
  newFilename: file.newFilename,
  originalFilename: file.originalFilename,
  size: file.size,
});
