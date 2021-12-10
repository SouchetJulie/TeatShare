/**
 * Meta data about a lesson file
 */
import { ObjectId } from 'bson';

export interface ILessonFile {
  title: ObjectId;
  subtitle?: string;
  file?: File;
  // meta data
  _id?: string;
  creationDate: Date;
  publicationDate?: Date;
  isDraft: boolean;
  // foreign keys
  authorId: ObjectId;
  categoryIds: ObjectId[];
  tagIds: ObjectId[];
  commentIds: ObjectId[];
}
