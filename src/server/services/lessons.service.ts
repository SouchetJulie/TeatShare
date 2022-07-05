import { cleanFileMetadata } from "@common/file.utils";
import storageService from "@services/storage.service";
import { addLessonToUser, isUser } from "@services/users.service";
import {
  ILesson,
  ILessonCreate,
  ILessonDB,
} from "@typing/lesson-file.interface";
import { IUserPublic } from "@typing/user.interface";
import { File } from "formidable";
import { InsertOneResult, ObjectId } from "mongodb";
import { Filter, getDatabase } from "./database.service";

const collection = (await getDatabase()).collection<ILessonDB>("LessonFile");
// Create text index for later text search
if (!collection.indexExists("title_text_subtitle_text")) {
  void collection.createIndex(
    {
      title: "text",
      subtitle: "text",
      authorId: 1,
    },
    { default_language: "french" }
  );
}

/**
 * Fetches all Lessons from database (optionally, with filters).
 *
 * @param {Filter<ILessonDB>} filters (optional)
 */
export const getAllLessons = async (
  filters?: Filter<ILessonDB>
): Promise<ILessonDB[]> => {
  const cursor = collection.find(filters ?? {});
  const lessons: ILessonDB[] = await cursor.toArray();
  // Free cursor resources
  cursor.close();
  return lessons.map(fromDatabase);
};

/**
 * Fetches one lesson from database.
 * @param {ObjectId} id Id (_id) of the lesson to fetch.
 * @return {Promise<ILessonDB | null>} The lesson, or null if not found.
 */
export const getOneLesson = async (id: ObjectId): Promise<ILesson | null> => {
  const lesson: ILessonDB | null = await collection.findOne({ _id: id });
  return lesson === null ? null : fromDatabase(lesson);
};

/**
 * Creates a new lesson by uploading it to the necessary services, with the relevant updates to the author as well.
 * @param {IUserPublic} user
 * @param {File} uploadedFile
 * @param {ILessonCreate} uploadedLesson
 * @throws {Error} If the given data is invalid or there is a problem with upload.
 */
export const createNewLesson = async (
  user: IUserPublic,
  uploadedFile: File,
  uploadedLesson: ILessonCreate
): Promise<{ id: ObjectId }> => {
  if (!uploadedLesson.title) {
    throw new Error("Titre manquant.");
  }
  if (!uploadedFile) {
    throw new Error("Fichier manquant.");
  }
  if (!isUser(user)) {
    throw new Error("Auteur invalide.");
  }

  // Add to cloud storage
  const file = cleanFileMetadata(uploadedFile);
  const destination = `${process.env.LESSON_UPLOAD_DIRECTORY}/${file.newFilename}`;
  await storageService.upload(file.filepath, {
    destination,
  });
  file.filepath = destination;

  console.log(`[LESSON] Uploaded ${file.originalFilename} to ${destination}.`);

  // Add to database
  const lesson: ILessonDB = {
    file,
    // default values
    title: uploadedLesson.title ?? "",
    subtitle: uploadedLesson.subtitle ?? "",
    isDraft: uploadedLesson.isDraft ?? true,
    creationDate: uploadedLesson.creationDate ?? new Date(),
    lastModifiedDate: uploadedLesson.lastModifiedDate ?? new Date(),
    // set the pub. date if necessary
    publicationDate: uploadedLesson.isDraft ? undefined : new Date(),
    // foreign keys
    authorId: user._id!,
    categoryIds:
      uploadedLesson.categoryIds?.map((id: string) => new ObjectId(id)) ?? [],
    commentIds: [],
    // other data
    bookmarkCount: 0,
  };

  const result: InsertOneResult<ILessonDB> = await collection.insertOne(lesson);

  if (result.acknowledged) {
    // Adding it to the user's lessons
    await addLessonToUser(user, result.insertedId);
    console.log(
      `[LESSON] L'upload de la leçon a réussi! id: ${result.insertedId}`
    );
    return { id: result.insertedId };
  } else {
    throw new Error(
      "L'upload de la leçon a échoué ! L'opération d'écriture a été ignorée."
    );
  }
};

/**
 * Update this lesson's update counter by the given amount
 * @param {ObjectId} lessonId
 * @param {number} amount
 */
export const updateBookmarkCounter = async (
  lessonId: ObjectId,
  amount: number
) => {
  return collection.updateOne(
    { _id: lessonId },
    { $inc: { bookmarkCount: amount } }
  );
};

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

/**
 * Converts the query to an object containing filters to use with the database.
 *
 * @param {Record<string, string|string[]>} rawQuery The query from the request
 * @param {IUserPublic} user The user at the origin of the request
 * @return {Filter<ILessonDB>} Filters
 */
export const getFiltersFromQuery = (
  rawQuery: Record<string, string | string[]>,
  user?: IUserPublic
): Filter<ILessonDB> => {
  const query: QueryEntry[] = Object.entries(rawQuery);
  const filters: Filter<ILessonDB> = {};

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
      case "bookmarks":
        if (value)
          filters._id = {
            $in: user?.bookmarkIds.map((id: string) => new ObjectId(id)),
          };
        break;

      default:
        throw new Error(`Filtre inconnu : '${key}'`);
    }
  }

  return filters;
};

const fromDatabase = (lesson: ILessonDB): ILesson => ({
  ...lesson,
  _id: lesson._id!.toString(),
  categoryIds: lesson.categoryIds.map((id) => id.toString()),
  commentIds: lesson.commentIds.map((id) => id.toString()),
});
