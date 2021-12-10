import { Collection } from 'mongodb';
import { getDatabase } from '@services/database.service';
import { SessionStore } from 'next-session';
import { SessionData } from 'next-session/lib/types';

/**
 * Links between session middleware and database.
 */
export class MongoDbSessionStore implements SessionStore {
  private collection: Collection<SessionData>;

  /**
   * Initializes a connection to the `sessions` collection in DB.
   */
  constructor() {
    getDatabase().then(db => this.collection = db.collection<SessionData>('sessions'));
  }

  /**
   * Removes the session.
   * @param {string} sid
   * @return {Promise<void>}
   */
  async destroy(sid: string): Promise<void> {
    await this.collection.deleteOne({_id: sid});
  }

  /**
   * Retrieves the session.
   * @param {string} sid
   * @return {Promise<SessionData | null | undefined>}
   */
  async get(sid: string): Promise<SessionData | null | undefined> {
    return this.collection.findOne({_id: sid});
  }

  /**
   * Creates the session.
   * @param {string} sid
   * @param {SessionData} sess
   * @return {Promise<void>}
   */
  async set(sid: string, sess: SessionData): Promise<void> {
    await this.collection.insertOne(sess);
  }

  /**
   * Updates the session.
   * @param {string} sid
   * @param {SessionData} sess
   * @return {Promise<void>}
   */
  async touch(sid: string, sess: SessionData): Promise<void> {
    await this.collection.updateOne({_id: sid}, sess);
  }

}