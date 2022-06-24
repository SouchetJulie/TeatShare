import { CleanFile } from "@typing/clean-file.interface";
import { ECourse } from "@typing/course.enum";
import { EGrade } from "@typing/grade.enum";
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
  course?: ECourse;
  // foreign keys (needs to accept string so that filtered queries work)
  authorId: ObjectId | string;
  tagIds: ObjectId[];
  commentIds: ObjectId[];
}

/**
 *
 * Data for creation of a lesson.
 */
export type ILessonCreate = Partial<ILesson>;
