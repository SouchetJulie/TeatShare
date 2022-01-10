import {getDatabase} from './database.service';
import {ILessonFile} from '../../types/lesson-file.interface';
import {ObjectId} from 'bson';


export const getAllLessons = async () => {
    try {
        const collection = (await getDatabase()).collection<ILessonFile>('LessonFile');
        return await collection.find({}).toArray();
    } catch (e) {
        return {error: e};
    }
}

export const getOneLesson = async (id: string) => {
    try {
        const collection = (await getDatabase()).collection<ILessonFile>('LessonFile');
        return await collection.findOne({_id: new ObjectId(id)});
    } catch (e) {
        return {error: e};
    }
};

export const createNewLesson = async (
    user: Record<any, any>, // TODO IUserDB
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
        if (!title) { // TODO test !isUser(user)
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
            user.lessonIds?.push(result.insertedId); // TODO remove `?`
            return {id: result.insertedId}
        } else {
            return {error: 'Lesson upload failed'};
        }
    } catch (e) {
        return {error: 'Lesson upload failed'};
    }
}
