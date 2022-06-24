import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import { ObjectId } from "bson";

/**
 * Data about a lessonDetails.
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
  grade?: EGrade;
  subject?: ESubject;
  // foreign keys (needs to accept string so that filtered queries work)
  authorId: ObjectId | string;
  categoryIds: ObjectId[];
  commentIds: ObjectId[];
}

/**
 *
 * Data for creation of a lesson.
 */
export type ILessonCreate = Partial<ILesson>;
