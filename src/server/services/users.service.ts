import {
  isFrenchAlpha,
  removeEmptyFields,
  RequestFormData,
  validateArrayStringField,
  validateStringField,
} from "@common/parse-form.utils";
import { uploadFile } from "@services/storage.service";
import { CleanFile } from "@typing/clean-file.interface";
import { ILessonDB } from "@typing/lesson.interface";
import {
  IUserAuth,
  IUserCreate,
  IUserDB,
  IUserPublic,
} from "@typing/user.interface";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import { File } from "formidable";
import { InsertOneResult } from "mongodb";
import validator from "validator";
import { Filter, getDatabase } from "./database.service";
import isEmail = validator.isEmail;
import isAscii = validator.isAscii;

const collection = (await getDatabase()).collection<IUserDB>("User");
// Create index for speeding up search
collection.createIndex({ email: 1 });

/**
 * Fetches all users from database.
 *
 * @return {Promise<IUserPublic[]>} The list (possibly empty) of all users found.
 */
const getAllUsers: () => Promise<IUserPublic[]> = async () => {
  const users = await collection.find({}).toArray();
  // remove password before sending it back
  users.forEach((user: IUserDB) => delete user.password);
  console.log(`[DB] Retrieved ${users.length} users from DB.`);
  return users.map(fromDatabase);
};

/**
 * Fetches one user from database.
 *
 * @param {string} email Email of the user to fetch.
 * @return {Promise<IUserPublic | null>} The user, or null if not found.
 */
const getUserByEmail = async (email: string): Promise<IUserPublic | null> => {
  const user = await collection.findOne({ email: email });

  if (!user) {
    return null;
  }
  // remove password before sending it back
  delete user.password;
  console.log(`[USER] Retrieved user ${user.email} from DB.`);
  return fromDatabase(user);
};

/**
 * Fetches one user from database.
 *
 * @param {string} userId Id (_id) of the user to fetch.
 * @return {Promise<IUserPublic | null>} The user, or null if not found.
 */
const getOneUser = async (userId: string): Promise<IUserPublic | null> => {
  const user: IUserDB | null = await collection.findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    console.warn(`[USER] Failed to get user ${userId}: not found`);
    return null;
  }

  // remove password before sending it back
  delete user.password;
  console.log(`[USER] Retrieved user ${user.email} from DB.`);
  return fromDatabase(user);
};

/**
 * Inserts a new user in database.
 *
 * @param {IUserCreate} user User to insert.
 * @return {Promise<InsertOneResult<IUserDB>>} The result of the insertion.
 * @throws {Error} If the credentials are invalid or already in use.
 */
const createNewUser = async (
  user: IUserCreate
): Promise<InsertOneResult<IUserDB>> => {
  if (!user.password || !user.email) {
    throw new Error("Données manquantes.");
  }
  // Is email already taken?
  const foundInDB = await collection.findOne<IUserDB>({ email: user.email });

  if (foundInDB) {
    throw new Error("Cet e-mail est déjà utilisé.");
  }

  const hashedPassword = bcrypt.hashSync(user.password, 13);

  const userDB: Omit<IUserDB, "_id"> = {
    ...initEmptyUser(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: hashedPassword,
  };
  return collection.insertOne(userDB);
};

/**
 * Checks whether the given user credentials are valid or not.
 * @param {IUserAuth} user
 * @return {Promise<boolean>}
 */
const checkCredentials = async (user: IUserAuth): Promise<boolean> => {
  try {
    const userDB = await collection.findOne<IUserDB>({
      email: user.email,
    });

    if (!userDB?.password || !user?.password) {
      return false;
    }

    return bcrypt.compare(user.password, userDB.password);
  } catch (e) {
    console.warn("[DB] Could not connect to database");
    return false;
  }
};

/**
 * Checks whether the given object is of User type.
 * @param {Record<string, any>} user
 * @return {boolean}
 */
const isUser = (user: Record<string, any>): user is IUserDB => {
  return user && user["error"] === undefined && user["email"];
};

/**
 * Adds the given lesson id to the list of lessons published by this user.
 * @param {IUserPublic} user
 * @param {ObjectId} lessonId
 */
const addLessonToUser = async (user: IUserPublic, lessonId: ObjectId) => {
  return collection.updateOne(
    { email: user.email },
    { $push: { lessonIds: lessonId } }
  );
};

/**
 * Adds the given lesson id to the list of lessons bookmarked by this user.
 * @param {IUserPublic} user
 * @param {ObjectId} lessonId
 */
const addBookmarkToUser = async (user: IUserPublic, lessonId: ObjectId) => {
  return collection.updateOne(
    { email: user.email },
    { $push: { bookmarkIds: lessonId } }
  );
};

/**
 * Removes the given lesson id from the list of lessons bookmarked by this user.
 * @param {IUserPublic} user
 * @param {string} lessonId
 */
const removeBookmarkFromUser = async (user: IUserPublic, lessonId: string) => {
  return collection.updateOne(
    { email: user.email },
    { $pull: { bookmarkIds: lessonId } }
  );
};

/**
 * Gets the filter to fetch all lessons bookmarked by this user.
 *
 * @param {IUserPublic} user The user whose bookmarks will be read
 * @return {Filter<ILessonDB>} Filter
 */
const getUserBookmarkFilter = (user: IUserPublic): Filter<ILessonDB> => {
  // No bookmark -> skip DB call
  if (user.lessonIds.length === 0) return {};

  return {
    _id: {
      $in: user.lessonIds.map((id: string) => new ObjectId(id)),
    },
  };
};

/**
 * Updates the given user in database.
 *
 * @param {ObjectId} _id ID of the user to update
 * @param {Partial<IUserDB>} updatedUser Data to update
 */
const updateUser = async (
  _id: ObjectId,
  updatedUser: Partial<IUserDB>
): Promise<boolean> => {
  const result = await collection.updateOne({ _id }, { $set: updatedUser });

  return result.acknowledged && result.matchedCount === 1;
};

/**
 * Transforms the raw data from the form into a User.
 * @param {RequestFormData} formData Data from the form.
 * @return {Partial<IUserDB>} User data.
 */
const prepareUserUpdate = async ({
  fields,
  files,
}: RequestFormData): Promise<Partial<IUserDB>> => {
  // Validation
  validateStringField(fields?.email, isEmail, "Email invalide");
  validateStringField(fields?.firstName, isFrenchAlpha, "Prénom invalide");
  validateStringField(fields?.lastName, isFrenchAlpha, "Nom invalide");
  validateStringField(fields?.description, isAscii, "Description invalide");
  validateStringField(fields?.location, isAscii, "Localisation invalide");
  validateArrayStringField(
    fields?.subjects,
    isAscii,
    "Liste de sujet invalide"
  );
  validateArrayStringField(
    fields?.grades,
    isAscii,
    "Liste de classes invalide"
  );
  // Avatar
  const avatarExists = !!files?.avatar;
  const avatarIsArray = Array.isArray(files?.avatar);
  const avatarIsValid = !avatarIsArray;
  let avatar: CleanFile | undefined = undefined;
  if (avatarExists) {
    if (!avatarIsValid) throw new Error("Avatar invalide");
    if (!process.env.AVATAR_UPLOAD_DIRECTORY)
      throw new Error("Upload de l'avatar échoué");

    avatar = await uploadFile(
      files!.avatar as File,
      process.env.AVATAR_UPLOAD_DIRECTORY
    );
    console.log("[USER] Avatar upload");
  }

  return removeEmptyFields({
    firstName: fields?.firstName as string,
    lastName: fields?.lastName as string,
    email: fields?.email as string,
    description: fields?.description as string,
    location: fields?.location as string,
    grades: fields?.grades as string[],
    subjects: fields?.subjects as string[],
    avatar,
  });
};

export {
  getAllUsers,
  getUserByEmail,
  getOneUser,
  createNewUser,
  checkCredentials,
  isUser,
  addLessonToUser,
  addBookmarkToUser,
  removeBookmarkFromUser,
  getUserBookmarkFilter,
  updateUser,
  prepareUserUpdate,
};

/**
 * Creates an empty User with default values.
 * @return {IUserDB}
 */
const initEmptyUser = (): IUserDB => {
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

const fromDatabase = (user: IUserDB): IUserPublic => ({
  ...user,
  _id: user._id!.toString(),
  lessonIds: user.lessonIds.map((id) => id.toString()),
  bookmarkIds: user.bookmarkIds.map((id) => id.toString()),
  commentIds: user.commentIds.map((id) => id.toString()),
});
