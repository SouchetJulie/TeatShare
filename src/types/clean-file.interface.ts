import { File } from "formidable";

export type CleanFile = Pick<
  File,
  | "filepath"
  | "hash"
  | "hashAlgorithm"
  | "mimetype"
  | "newFilename"
  | "originalFilename"
  | "size"
>;
