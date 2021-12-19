import { getDatabase } from './database.service';
import { ILessonFile } from '@typing/lesson-file.interface';
import { ObjectId } from 'bson';
import { IUserPublic } from '@typing/user.interface';
import { addLesson, isUser } from '@services/users.service';


export const getAllLessons = async () => {
  try {
    const collection = (await getDatabase()).collection<ILessonFile>('LessonFile');
    return await collection.find({}).toArray();
  } catch (e) {
    return {error: e};
  }
}

export const createNewLesson = async (
  user: IUserPublic,
  {
    title,
    subtitle,
    file,
    // default values
    creationDate = new Date(),
    publicationDate,
    isDraft = true,
    // foreign keys
    categoryIds = [],
    tagIds = [],
    commentIds = [],
  }: ILessonFile
): Promise<{ id: ObjectId } | { error: string }> => {
  try {
    if (!title || !isUser(user)) {
      return {error: 'Missing author or title.'};
    }

    const collection = (await getDatabase()).collection<ILessonFile>('LessonFile');

    const lessonFile: ILessonFile = {
      title,
      subtitle,
      file,
      // meta data
      creationDate,
      publicationDate,
      isDraft,
      // foreign keys
      authorId: user._id,
      categoryIds,
      tagIds,
      commentIds,
    };

    const result = await collection
      // @ts-ignore as TS for some reason tries to force the presence of "_id" field, even though it's not necessary according to the type definition
      .insertOne(lessonFile);

    if (result.acknowledged) {
      // Adding it to the user's lessons
      user.lessonIds.push(result.insertedId);
      await addLesson(user, result.insertedId); // TODO debug

      console.log(`[LESSON] Lesson upload successful! id: ${result.insertedId}`);
      return {id: result.insertedId}
    } else {
      const error = 'Lesson upload failed! Write operation was not acknowledged.';
      console.log(`[LESSON] ${error}`);
      return {error};
    }
  } catch (e) {
    const error = `Lesson upload failed! There was an error: ${e}`;
    console.log(`[LESSON] ${error}`);
    return {error};
  }
}