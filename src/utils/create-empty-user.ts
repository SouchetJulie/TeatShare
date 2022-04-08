import { IUserPublic } from "@typing/user.interface";

/**
 * Creates an empty User with default values.
 * @return {IUserPublic}
 */
export const createEmptyUser = (): IUserPublic => {
  return {
    // set default values
    joinDate: new Date(),
    description: "",
    location: "",
    // foreign keys
    grades: [],
    subjects: [],
    lessonIds: [],
    bookmarkIds: [],
    commentIds: [],
    // authentication parameters
    email: "",
    firstName: "",
    lastName: "",
  };
};
