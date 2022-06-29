import {
  IUserAuth,
  IUserCreate,
  IUserDB,
  IUserPublic,
} from "@typing/user.interface";
import { createEmptyUser } from "@utils/create-empty-user";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import { InsertOneResult } from "mongodb";
import { getDatabase } from "./database.service";

const collection = (await getDatabase()).collection<IUserDB>("User");
// Create index for speeding up search
collection.createIndex({ email: 1 });

/**
 * Fetches all users from database.
 *
 * @return {Promise<IUserDB[]>} The list (possibly empty) of all users found.
 */
export const getAllUsers: () => Promise<IUserDB[]> = async () => {
  const users = await collection.find({}).toArray();
  // remove password before sending it back
  users.forEach((user: IUserDB) => delete user.password);
  console.log(`[DB] Retrieved ${users.length} users from DB.`);
  return users;
};

/**
 * Fetches one user from database.
 *
 * @param {string} email Email of the user to fetch.
 * @return {Promise<IUserPublic | null>} The user, or null if not found.
 */
export const getUserByEmail = async (
  email: string
): Promise<IUserPublic | null> => {
  const user = await collection.findOne({ email: email });

  if (!user) {
    return null;
  }
  // remove password before sending it back
  delete user.password;
  console.log(`[USER] Retrieved user ${user.email} from DB.`);
  return user;
};

/**
 * Fetches one user from database.
 *
 * @param {string} userId Id (_id) of the user to fetch.
 * @return {Promise<IUserPublic | null>} The user, or null if not found.
 */
export const getOneUser = async (
  userId: string
): Promise<IUserPublic | null> => {
  const user: IUserDB | null = await collection.findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    return null;
  }

  // remove password before sending it back
  delete user.password;
  console.log(`[USER] Retrieved user ${user.email} from DB.`);
  return user;
};

/**
 * Inserts a new user in database.
 *
 * @param {IUserCreate} user User to insert.
 * @return {Promise<InsertOneResult<IUserDB>>} The result of the insertion.
 * @throws {Error} If the credentials are invalid or already in use.
 */
export const createNewUser = async (
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
    ...createEmptyUser(),
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
export const checkCredentials = async (user: IUserAuth): Promise<boolean> => {
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
export const isUser = (user: Record<string, any>): user is IUserDB => {
  return user && user["error"] === undefined && user["email"];
};

/**
 * Adds the given lesson id to the list of lessons published by this user.
 * @param {IUserPublic} user
 * @param {string} lessonId
 */
export const addLessonToUser = async (user: IUserPublic, lessonId: string) => {
  return collection.updateOne(
    { email: user.email },
    { $push: { lessonIds: lessonId } }
  );
};

/**
 * Adds the given lesson id to the list of lessons bookmarked by this user.
 * @param {IUserPublic} user
 * @param {string} lessonId
 */
export const addBookmarkToUser = async (
  user: IUserPublic,
  lessonId: string
) => {
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
export const removeBookmarkFromUser = async (
  user: IUserPublic,
  lessonId: string
) => {
  return collection.updateOne(
    { email: user.email },
    { $pull: { bookmarkIds: lessonId } }
  );
};

/**
 * Updates the given user in database.
 *
 * @param {ObjectId} _id ID of the user to update
 * @param {Partial<IUserDB>} updatedUser Data to update
 */
export const updateUser = async (
  _id: ObjectId,
  updatedUser: Partial<IUserDB>
): Promise<boolean> => {
  const result = await collection.updateOne({ _id }, { $set: updatedUser });

  console.log(result); // TODO debug
  return result.acknowledged && result.matchedCount === 1;
};
