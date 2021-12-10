import bcrypt from 'bcryptjs';
import { InsertOneResult } from 'mongodb';

import { getDatabase } from './database.service';
import { IUserAuth, IUserDB } from '../../types/user.interface';
import { ObjectId } from 'bson';

export const getAllUsers = async () => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const users = await collection.find({}).toArray();
    // remove password before sending it back
    users.forEach(user => delete user.password);
    return users;
  } catch (e) {
    return { error: e };
  }
};

export const getUser = async (userId: ObjectId) => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const user = await collection.findOne({_id: userId});
    // remove password before sending it back
    delete user.password;
    return user;
  } catch (e) {
    return { error: e };
  }
}

export const createNewUser = async (user: IUserAuth): Promise<{error} | InsertOneResult<IUserDB>> => {
  try {
    if (!user.firstName || !user.lastName || !user.password || !user.email) {
      return {error: 'Missing values'};
    }
    const collection = (await getDatabase()).collection<IUserDB>("User");

    // Is email already taken?
    const foundInDB = await collection.findOne<IUserDB>({email: user.email});

    if (foundInDB) {
      return {error: 'Email is already in use.'};
    }

    const hashedPassword =  bcrypt.hashSync(user.password, 15);

    const userDB: IUserDB = {
      // set default values
      joinDate: new Date(),
      description: '',
      location: '',
      // foreign keys
      grades: [],
      subjects: [],
      lessonIds: [],
      bookmarkIds: [],
      commentIds: [],
      // add authentication parameters
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: hashedPassword
    };

    return await collection
      // @ts-ignore as TS for some reason tries to force the presence of "_id" field, even though it's not necessary according to the type definition
      .insertOne(userDB);
  } catch (e) {
    return { error: e };
  }
};

/**
 * Checks whether the given user credentials are valid or not.
 * @param {IUserAuth} user
 * @return {Promise<{error} | boolean>}
 */
export const checkCredentials = async (user: IUserAuth): Promise<boolean> => {
  try {
    const collection = (await getDatabase()).collection<IUserDB>("User");
    const userDB = await collection.findOne<IUserDB>({
      email: user.email
    });

    return await bcrypt.compare(user.password, userDB.password);
  } catch (e) {
    return false;
  }
}

/**
 * Checks whether the given object is of User type.
 * @param {Record<string, any>} user
 * @return {boolean}
 */
export const isUser = (user: Record<string, any>): user is IUserDB => {
  return user && user['error'] === undefined && user['email'];
}
