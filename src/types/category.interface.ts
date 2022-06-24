import { ObjectId } from "bson";

/**
 * Categories are "tags" defined by the admins to avoid duplicates.
 * Categories can be added at the users' request.
 * The list is stored in database.
 */
interface ICategoryDB {
  _id: ObjectId;
  label: string;
}

/**
 * Categories are "tags" defined by the admins to avoid duplicates.
 * Categories can be added at the users' request.
 * The list is stored in database.
 */
type ICategory = { _id: string } & Omit<ICategoryDB, "_id">;

export type { ICategory, ICategoryDB };
