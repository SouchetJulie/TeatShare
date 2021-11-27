import bcrypt from 'bcrypt';
import { InsertOneResult } from 'mongodb';

import { getDatabase } from '../database';
import { UserAuth, UserDB } from '../../../types/User';

export const getAllUsers = async () => {
  try {
    const collection = (await getDatabase()).collection<UserDB>("User");
    const users = await collection.find({}).toArray();
    // remove password before sending it back
    users.forEach(user => delete user.password);
    return users;
  } catch (e) {
    return { error: e };
  }
};

export const createNewUser = async (user: UserAuth): Promise<{error} | InsertOneResult<UserDB>> => {
  try {
    if (!user.firstName || !user.lastName || !user.password || !user.email) {
      return { error: 'Missing values'};
    }
    const collection = (await getDatabase()).collection<UserDB>("User");

    const hashedPassword =  bcrypt.hashSync(user.password, 15);

    const userDB: UserDB = {
      // set default values
      joinDate: new Date(),
      description: '',
      location: '',
      // foreign keys
      grades: [],
      subjects: [],
      postIds: [],
      bookmarkIds: [],
      commentIds: [],
      // add authentication parameters
      ...user,
      password: hashedPassword
    };

    return await collection
      // @ts-ignore as TS for some reason tries to force the presence of "_id" field, even though it's not necessary according to the type definition
      .insertOne(userDB);
  } catch (e) {
    return { error: e };
  }
};

export const login = async (user: UserAuth): Promise<{error} | boolean> => {
  try {
    const collection = (await getDatabase()).collection<UserDB>("User");
    const userDB = await collection.findOne<UserDB>({
      email: user.email
    });

    return await bcrypt.compare(user.password, userDB.password);
  } catch (e) {
    return {error: 'Login failed'}
  }
}
