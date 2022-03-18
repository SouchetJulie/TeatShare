import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import { InsertOneResult } from "mongodb";

import { createEmptyUser } from "@utils/create-empty-user";
import {
  IUserAuth,
  IUserCreate,
  IUserDB,
  IUserPublic,
} from "@typing/user.interface";
import { getDatabase } from "./database.service";

export const getAllUsers = async () => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const users = await collection.find({}).toArray();
    // remove password before sending it back
    users.forEach((user) => delete user.password);
    return users;
  } catch (e) {
    return { error: e };
  }
};

export const getUserByEmail = async (
  email: string
): Promise<IUserPublic | null> => {
  const collection = (await getDatabase()).collection<IUserDB>("User");
  const user = await collection.findOne({ email: email });
  if (!user) {
    return null;
  }
  // remove password before sending it back
  delete user.password;
  console.log(`[DB] Retrieved user ${user.email} from DB.`);
  return user;
};

export const getOneUser = async (userId: string) => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return { error: `Utilisateur n° ${userId} inconnu.` };
    }

    // remove password before sending it back
    delete user.password;
    return user;
  } catch (e) {
    return { error: e };
  }
};

export const createNewUser = async (
  user: IUserCreate
): Promise<{ error: string } | InsertOneResult<IUserDB>> => {
  try {
    if (!user.password || !user.email) {
      return { error: "Données manquantes." };
    }
    const collection = (await getDatabase()).collection<IUserDB>("User");

    // Is email already taken?
    const foundInDB = await collection.findOne<IUserDB>({ email: user.email });

    if (foundInDB) {
      return { error: "Cet e-mail est déjà utilisé." };
    }

    const hashedPassword = bcrypt.hashSync(user.password, 15);

    const userDB: IUserDB = {
      ...createEmptyUser(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: hashedPassword,
    };
    return await collection.insertOne(userDB);
  } catch (e) {
    return { error: (e as Error).message };
  }
};

/**
 * Checks whether the given user credentials are valid or not.
 * @param {IUserAuth} user
 * @return {Promise<boolean>}
 */
export const checkCredentials = async (user: IUserAuth): Promise<boolean> => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const userDB = await collection.findOne<IUserDB>({
      email: user.email,
    });

    if (!userDB?.password || !user?.password) {
      return false;
    }

    return bcrypt.compare(user.password, userDB.password);
  } catch (e) {
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
 * @param {ObjectId} lessonId
 */
export const addLessonToUser = async (
  user: IUserPublic,
  lessonId: ObjectId
) => {
  const collection = (await getDatabase()).collection<IUserDB>("User");
  return collection.updateOne(
    { email: user.email },
    { $push: { lessonIds: lessonId } }
  );
};
