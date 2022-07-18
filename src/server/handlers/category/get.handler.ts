import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { getAllCategories, getOneCategory } from "@services/categories.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ICategoryDB } from "@typing/category.interface";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const categoryGetAllHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ categories: ICategoryDB[] }>>
) => {
  try {
    const categories = await getAllCategories();
    console.log(`[CATEGORY] ${categories.length} categories found`);
    res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (e) {
    console.error(`[CATEGORY] Failed to get all categories: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de toutes les catégories",
    });
  }
};

const baseCategoryGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ category: ICategoryDB }>>
  ) => {
    const { _id: id } = req.body.sanitized as { _id: string };

    try {
      const category = await getOneCategory(new ObjectId(id));

      if (!category) {
        console.warn(`[CATEGORY] Failed to get category ${id}: not found`);
        return res.status(404).json({
          success: false,
          error: `Catégorie ${id} non trouvée`,
        });
      }

      return res.status(200).json({
        success: true,
        data: { category },
      });
    } catch (e) {
      console.error(`[CATEGORY] Failed to get category ${id}: ${e}`);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de la catégorie",
      });
    }
  };

const categoryGetOneHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseCategoryGetOneHandler(_id));

export { categoryGetAllHandler, categoryGetOneHandler };
