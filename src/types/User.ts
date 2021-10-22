import { Grade } from "./Grade";
import { Subject } from "./Subject";

/**
 * Basic data about an User
 */
export class UserBase {
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  avatar?: File;
  joinDate: Date = new Date();
}

/**
 * Used **only** when creating a new User
 */
export class UserCreation extends UserBase {
  password: string = "";
}

/**
 * Represents an User (basic data + what is found on their profile)
 */
export class User extends UserBase {
  _id: string = "";
  description?: string;
  location?: string;
  grades: Grade[] = [];
  subjects: Subject[] = [];
  // foreign keys
  postIds: string[] = [];
  bookmarkIds: string[] = [];
  commentIds: string[] = [];
}
