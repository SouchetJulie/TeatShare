import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import { Replace } from "@typing/utility-types";
import { ObjectId } from "mongodb";

/**
 * Data about a lesson in database.
 */
export interface ILessonDB {
  file: CleanFile;
  // meta data
  _id?: ObjectId;
  title: string;
  subtitle?: string;
  creationDate: Date;
  lastModifiedDate: Date;
  publicationDate?: Date;
  isDraft: boolean;
  grade?: EGrade;
  subject?: ESubject;
  bookmarkCount: number;
  // foreign keys (needs to accept string so that filtered queries work)
  authorId: ObjectId;
  categoryIds: ObjectId[];
  commentIds: ObjectId[];
}

/**
 * Used for sharing data about a lesson.
 */
export type ILesson = Replace<
  // replace all string by string
  Replace<ILessonDB, ObjectId | undefined, string>,
  ObjectId[],
  string[]
>;

/**
 * Data for creation of a lesson.
 */
export type ILessonCreate = Partial<ILesson>;
