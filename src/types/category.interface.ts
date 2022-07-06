/**
 * Categories are "tags" defined by the admins to avoid duplicates.
 * Categories can be added at the users' request.
 * The list is stored in database.
 */
import { Replace } from "@typing/utility-types";
import { ObjectId } from "mongodb";

interface ICategoryDB {
  _id: ObjectId;
  label: string;
}

/**
 * Categories are "tags" defined by the admins to avoid duplicates.
 * Categories can be added at the users' request.
 * The list is stored in database.
 */
type ICategory = Replace<ICategoryDB, ObjectId, string>;

export type { ICategory, ICategoryDB };
