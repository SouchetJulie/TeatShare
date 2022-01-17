import {ObjectId} from 'bson';
import {File} from "formidable";

import {getDatabase} from './database.service';
import {addLesson, isUser} from '@services/users.service';
import {ILesson, ILessonCreate} from '@typing/lesson-file.interface';
import {IUserPublic} from '@typing/user.interface';
import storageService from "@services/storage.service";
import {cleanFileMetadata} from "@common/file.utils";

/**
 * Fetches all Lessons from database.
 */
export const getAllLessons = async () => {
    try {
        const collection = (await getDatabase()).collection<ILesson>('LessonFile');
        return await collection.find({}).toArray();
    } catch (e) {
        return {error: e};
    }
};

export const getOneLesson = async (id: string) => {
    try {
        const collection = (await getDatabase()).collection<ILesson>('LessonFile');
        return await collection.findOne({_id: new ObjectId(id)});
    } catch (e) {
        return {error: e};
    }
};

/**
 * Creates a new Lesson by uploading it to the necessary services, with the relevant updates to the author as well.
 * @param {IUserPublic} user
 * @param {File} uploadedFile
 * @param {ILessonCreate} uploadedLesson
 */
export const createNewLesson = async (
    user: IUserPublic,
    uploadedFile: File,
    uploadedLesson: ILessonCreate): Promise<{ id: ObjectId } | { error: string }> => {
    try {
        if (!uploadedLesson.title) {
            return {error: 'Missing title.'};
        }
        if (!uploadedFile) {
            return {error: 'Missing file.'};
        }
        if (!isUser(user)) {
            return {error: 'Missing author .'};
        }

        // Add to cloud storage
        const file = cleanFileMetadata(uploadedFile)
        const destination = `${process.env.LESSON_UPLOAD_DIRECTORY}/${file.newFilename}`
        await storageService.upload(file.filepath, {
            destination
        });
        file.filepath = destination;

        console.log(`[LESSON] Uploaded ${file.originalFilename} to ${destination}.`)

        // Add to database
        const lesson: ILesson = {
            file,
            // default values
            title: '',
            subtitle: '',
            isDraft: true,
            creationDate: new Date(),
            lastModifiedDate: new Date(),
            // set the pub. date if necessary
            publicationDate: (uploadedLesson.isDraft ? undefined : new Date()),
            // foreign keys
            authorId: new ObjectId(user._id),
            categoryIds: [],
            tagIds: [],
            commentIds: [],
            ...uploadedLesson
        };

        const collection = (await getDatabase()).collection<ILesson>('LessonFile');
        const result = await collection
            .insertOne(lesson);

        if (result.acknowledged) {
            // Adding it to the user's lessons
            const updateResult = await addLesson(user, result.insertedId);

            if (updateResult.modifiedCount === 1) {
                console.log(`[LESSON] Lesson upload successful! id: ${result.insertedId}`, updateResult);
                return {id: result.insertedId};
            } else {
                const error = 'Lesson upload failed! Write operation was not acknowledged.';
                console.log(`[LESSON] ${error}`);
                return {error};
            }
        }
    } catch (e) {
        const error = `Lesson upload failed! There was an error: ${e}`;
        console.log(`[LESSON] ${error}`);
        return {error};
    }
};
