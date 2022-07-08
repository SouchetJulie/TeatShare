import { CleanFile } from "@typing/clean-file.interface";
import { ESubject } from "@typing/subject.enum";
import { Replace } from "@typing/utility-types";
import { ObjectId } from "bson";
import { EGrade } from "./grade.enum";

/**
 * Used for authentication
 */
export interface IUserAuth {
  email: string;
  password?: string; // to be removed outside of auth
}

/**
 * Used for creating a new User
 */
export interface IUserCreate extends IUserAuth {
  firstName?: string;
  lastName?: string;
}

/**
 * Data about a user's profile
 */
export interface IUserProfile extends IUserCreate {
  description: string;
  location: string;
  grades: EGrade[];
  subjects: ESubject[];
  avatar?: CleanFile;
}

/**
 * **All** data about a user.
 * @property {string} _id optional
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {CleanFile} avatar
 * @property {Date} joinDate
 * @property {string} description
 * @property {string} location
 * @property {EGrade[]} grades
 * @property {ESubject[]} subjects
 * @property {string[]} postIds
 * @property {string[]} bookmarkIds
 * @property {string[]} commentIds
 */
export interface IUserDB extends IUserProfile {
  _id?: ObjectId; // used in database
  joinDate: Date;
  // foreign keys
  lessonIds: ObjectId[];
  bookmarkIds: ObjectId[];
  commentIds: ObjectId[];
}

/**
 * Used for sending data to the client about a User
 */
export type IUserPublic = Replace<
  // replace all ObjectId by string
  Replace<Omit<IUserDB, "password">, ObjectId | undefined, string | undefined>,
  ObjectId[],
  string[]
>;
