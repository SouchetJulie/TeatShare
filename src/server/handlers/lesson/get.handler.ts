import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@middlewares/sanitization/validate.middleware";
import { getAllLessons, getOneLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILessonDB } from "@typing/lesson.interface";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { Filter } from "@services/database.service";

// A [key, value] tuple
type QueryEntry = [string, string | string[]];

/**
 * Checks that the given value is actually a single string instead of an array of strings.
 *
 * @param {string | string[]} value Value read from request.
 * @param {string} message Error message to send back.
 * @throws {Error} if `value` is an array.
 */
const forbidMultipleValues = (
  value: string | string[],
  message?: string
): void => {
  if (Array.isArray(value)) {
    throw new Error(message || "les valeurs multiples sont interdites");
  }
};

/**
 * Make sure the given value is an array of strings.
 *
 * @param {string | string[]} value
 * @return {string[]}
 */
const toArray = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : [value];

const lessonGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  // Read filters from request
  const query: QueryEntry[] = Object.entries(req.query);

  // No filters -> get all lessons
  if (query.length === 0) {
    const lessons: ILessonDB[] = await getAllLessons();
    return res.status(200).json({
      success: true,
      data: { lessons },
    });
  }

  const filters: Filter<ILessonDB> = {};

  try {
    for (const [key, value] of query) {
      switch (key) {
        // Search by author id (multiple values are treated as "or")
        case "author":
          filters.authorId = { $in: toArray(value) };
          break;

        // Text search (in title and subtitle)
        case "title":
        case "subtitle":
          forbidMultipleValues(
            value,
            "On ne peut chercher qu'un titre/sous-titre à la fois"
          );
          filters.$text = {
            $search: value as string,
            $caseSensitive: false,
          };
          break;

        // Search by draft status
        case "isDraft":
          forbidMultipleValues(
            value,
            "On ne peut chercher qu'un seul statut de brouillon à la fois"
          );
          filters.isDraft = JSON.parse(value as string);
          break;

        // Search by category id (multiple values are treated as "and")
        case "category":
          filters.categoryIds = {
            $all: toArray(value),
          };
          break;

        // Search by tag id (multiple values are treated as "and")
        case "tag":
          filters.tagIds = {
            $all: toArray(value),
          };
          break;

        // Search by creation date
        case "creationDateBefore":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de fin pour la date de création"
          );
          filters.creationDate = {
            ...filters.creationDate,
            $lte: new Date(value as string),
          };
          break;
        case "creationDateAfter":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de début pour la date de création"
          );
          filters.creationDate = {
            ...filters.creationDate,
            $gte: new Date(value as string),
          };
          break;

        // Search by lastModified date
        case "lastModifiedDateBefore":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de fin pour la date de modification"
          );
          filters.lastModifiedDate = {
            ...filters.lastModifiedDate,
            $lte: new Date(value as string),
          };
          break;
        case "lastModifiedDateAfter":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de début pour la date de modification"
          );
          filters.lastModifiedDate = {
            ...filters.lastModifiedDate,
            $gte: new Date(value as string),
          };
          break;

        // Search by publication date
        case "publicationDateBefore":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de fin pour la date de publication"
          );
          filters.publicationDate = {
            ...filters.publicationDate,
            $lte: new Date(value as string),
          };
          break;
        case "publicationDateAfter":
          forbidMultipleValues(
            value,
            "On ne peut avoir qu'une seule limite de début pour la date de publication"
          );
          filters.publicationDate = {
            ...filters.publicationDate,
            $gte: new Date(value as string),
          };
          break;

        default:
          return res.status(400).json({
            success: false,
            error: `Filtre inconnu : '${key}'`,
          });
      }
    }

    // Read lessons from database & send result
    const lessons: ILessonDB[] = await getAllLessons(filters);
    res.status(200).json({
      success: true,
      data: { lessons },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: `Requête malformée: ${(e as Error).message}`,
    });
  }
};

const baseLessonGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ lesson: ILessonDB }>>
  ) => {
    const { _id: id } = req.body.sanitized as { _id: string };

    try {
      const lesson = await getOneLesson(id);
      if (!lesson) {
        console.log(`[LESSON] Lesson ${id} not found`);
        return res.status(404).json({
          success: false,
          error: "Leçon non trouvée",
        });
      }

      console.log(`[LESSON] Lesson ${id} found`);
      return res.status(200).json({
        success: true,
        data: { lesson },
      });
    } catch (e) {
      console.log("[LESSON] Error while fetching lesson:", e);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de la leçon",
      });
    }
  };

const lessonGetOneHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseLessonGetOneHandler(_id));

export { lessonGetAllHandler, lessonGetOneHandler };
