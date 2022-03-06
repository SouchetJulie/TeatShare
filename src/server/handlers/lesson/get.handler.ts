import { NextApiRequest, NextApiResponse } from "next";

import { getAllLessons, getOneLesson } from "@services/lessons.service";
import { ILesson } from "@typing/lesson-file.interface";
import { Filter } from "@services/database.service";

// A [key, value] tuple
type QueryEntry = [string, string | string[]];

/**
 * Remove empty filters that would just raise an error.
 *
 * @param {Filter<ILesson>} filters Filters for a MongoDB query.
 */
const removeEmptyFilters = (filters: Filter<ILesson>) => {
  if (filters.$or.length === 0) {
    delete filters.$or;
  }
};

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
  res: NextApiResponse
) => {
  // Read filters from request
  const query: QueryEntry[] = Object.entries(req.query);

  // No filters -> get all lessons
  if (query.length === 0) {
    const lessons: ILesson[] = await getAllLessons();
    return res.status(200).json({
      success: true,
      lessons,
    });
  }

  const filters: Filter<ILesson> = { $or: [] }; // Initializes "$or" array for multiples choices

  try {
    for (const [key, value] of query) {
      switch (key) {
        // Search by author id (multiple values are treated as "or")
        case "author":
          if (Array.isArray(value)) {
            filters.$or.push(
              ...value.map((element: string) => ({
                authorId: element,
              }))
            );
          } else {
            filters.authorId = value;
          }
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

    // Remove unnecessary filter
    removeEmptyFilters(filters);

    // Read lessons from database & send result
    const lessons: ILesson[] = await getAllLessons(filters);
    res.status(200).json({
      success: true,
      lessons,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: `Requête malformée: ${e.message}`,
    });
  }
};

const lessonGetOneHandler =
  (_id: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await getOneLesson(_id);

    if ("error" in result) {
      return res.status(404).json({ success: false, error: result.error });
    }

    return res.status(200).json({ success: true, lesson: result });
  };

export { lessonGetAllHandler, lessonGetOneHandler };
