import { ICategoryDB } from "@typing/category.interface";
import { getDatabase } from "./database.service";

const collection = (await getDatabase()).collection<ICategoryDB>("Category");

/**
 * Fetches all Categories from database
 */
export const getAllCategories = async (): Promise<ICategoryDB[]> => {
  const cursor = collection.find();
  const categories: ICategoryDB[] = await cursor.toArray();
  // Free cursor resources
  cursor.close();
  return categories;
};

/**
 * Fetches one category from database.
 * @param {string} id Id (_id) of the category to fetch.
 * @return {Promise<ICategoryDB | null>} The category, or null if not found.
 */
export const getOneCategory = async (
  id: string
): Promise<ICategoryDB | null> => {
  return collection.findOne({ _id: id });
};
