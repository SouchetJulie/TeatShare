import { ObjectId } from "bson";
import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ECourse } from "@typing/course.enum";

/**
 * Data about a lesson.
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
  course?: ECourse;
  bookmarkCount: number;
  // foreign keys (needs to accept string so that filtered queries work)
  authorId: string;
  tagIds: string[];
  commentIds: string[];
}

/**
 * Data about a lesson.
 */
export type ILesson = { _id: string } & Omit<ILessonDB, "_id">;

/**
 *
 * Data for creation of a lesson.
 */
export type ILessonCreate = Partial<ILessonDB>;
