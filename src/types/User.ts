import { Grade } from './Grade';
import { Subject } from './Subject';

/**
 * Used for authentication and sign-up
 */
export interface UserAuth {
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
 * @property {Grade[]} grades
 * @property {Subject[]} subjects
 * @property {string[]} postIds
 * @property {string[]} bookmarkIds
 * @property {string[]} commentIds
 */
export interface UserDB extends UserAuth {
  _id?: string; // used in database
  avatar?: File;
  joinDate: Date;
  description: string;
  location: string;
  grades: Grade[];
  subjects: Subject[];
  // foreign keys
  postIds: string[];
  bookmarkIds: string[];
  commentIds: string[];
}

export type UserPublic = Omit<UserDB, 'password'>;
