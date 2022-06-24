import { cleanFileMetadata } from "@common/file.utils";
import storageService from "@services/storage.service";
import { addLessonToUser, isUser } from "@services/users.service";
import { ILesson, ILessonCreate } from "@typing/lesson-file.interface";
import { IUserPublic } from "@typing/user.interface";
import { ObjectId } from "bson";
import { File } from "formidable";
import { Filter, getDatabase } from "./database.service";

const collection = (await getDatabase()).collection<ILesson>("LessonFile");
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
 * @param {Filter<ILesson>} filters (optional)
 */
export const getAllLessons = async (
  filters?: Filter<ILesson>
): Promise<ILesson[]> => {
  const cursor = collection.find(filters ?? {});
  const lessons: ILesson[] = await cursor.toArray();
  // Free cursor resources
  cursor.close();
  return lessons;
};

/**
 * Fetches one lesson from database.
 * @param {string} id Id (_id) of the lesson to fetch.
 * @return {Promise<ILesson | null>} The lesson, or null if not found.
 */
export const getOneLesson = async (id: string): Promise<ILesson | null> => {
  return collection.findOne({ _id: new ObjectId(id) });
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
  const lesson: ILesson = {
    file,
    // default values
    title: "",
    subtitle: "",
    isDraft: true,
    creationDate: new Date(),
    lastModifiedDate: new Date(),
    // set the pub. date if necessary
    publicationDate: uploadedLesson.isDraft ? undefined : new Date(),
    // foreign keys
    authorId: user._id ?? "",
    tagIds: [],
    commentIds: [],
    ...uploadedLesson,
  };

  const result = await collection.insertOne(lesson);

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
