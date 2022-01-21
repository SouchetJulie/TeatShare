import { ObjectId } from "bson";
import { CleanFile } from "@typing/clean-file.interface";

/**
 * Data about a lessonPost.
 */
export interface ILesson {
  file: CleanFile;
  // meta data
  _id?: ObjectId;
  title: string;
  subtitle?: string;
  creationDate: Date;
  lastModifiedDate: Date;
  publicationDate?: Date;
  isDraft: boolean;
  // foreign keys
  authorId: ObjectId;
  categoryIds: ObjectId[];
  tagIds: ObjectId[];
  commentIds: ObjectId[];
}

/**
 *
 * Data for creation of a Lesson.
 */
export type ILessonCreate = Partial<ILesson>;
