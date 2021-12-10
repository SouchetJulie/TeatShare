import { EGrade } from './grade.enum';
import { ESubject } from './subject.enum';

/**
 * Used for authentication and sign-up
 */
export interface IUserAuth {
  email: string,
  password: string, // to be removed outside of auth
  firstName?: string;
  lastName?: string;
}

/**
 * **All** data about a user.
 * @property {string} _id optional
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {File} avatar
 * @property {Date} joinDate
 * @property {string} description
 * @property {string} location
 * @property {EGrade[]} grades
 * @property {ESubject[]} subjects
 * @property {string[]} postIds
 * @property {string[]} bookmarkIds
 * @property {string[]} commentIds
 */
export interface IUserDB extends IUserAuth {
  _id?: string; // used in database
  avatar?: File;
  joinDate: Date;
  description: string;
  location: string;
  grades: EGrade[];
  subjects: ESubject[];
  // foreign keys
  postIds: string[];
  bookmarkIds: string[];
  commentIds: string[];
}

/**
 * Used for sending data to the client about an User
 */
export type IUserPublic = Omit<IUserDB, 'password'>;
