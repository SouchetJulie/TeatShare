/**
 * Categories are "tags" defined by the admins to avoid duplicates.
 * Categories can be added at the users' request.
 * The list is stored in database.
 */
export interface ICategory {
  _id: string;
  label: string;
}
