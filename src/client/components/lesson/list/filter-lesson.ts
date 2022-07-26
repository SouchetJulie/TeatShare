import { LessonFilter } from "@components/lesson/list/lesson-filter-reducer.hook";
import { ILesson } from "@typing/lesson.interface";
import { toArray, valueExists } from "@utils/parse-form.utils";

export const filterLesson = (filters: LessonFilter, lesson: ILesson): boolean =>
  Object.entries(filters)
    .map(([key, value]: [string, LessonFilter[keyof LessonFilter]]) => {
      // if value is undefined, it means that the filter is not active, and so we keep the lesson
      if (!valueExists(value)) {
        return true;
      }

      switch (key) {
        // Draft / Published
        case "isDraft":
          return lesson.isDraft === value;

        // Bookmark count
        case "bookmarksAbove":
          return typeof value === "number" && lesson.bookmarkCount >= value;
        case "bookmarksBelow":
          return typeof value === "number" && lesson.bookmarkCount <= value;

        // Title & subtitle
        case "text":
          return (
            typeof value === "string" &&
            (lesson.title.toLowerCase().includes(value.toLowerCase()) ||
              lesson.subtitle?.toLowerCase().includes(value.toLowerCase()))
          );

        // Author TODO filter by author name
        case "authorId":
          return (
            typeof value === "string" &&
            lesson.authorId.toLowerCase().includes(value.toLowerCase())
          );

        // Subject
        case "subject": {
          const array = toArray(value as string | string[]);
          return lesson.subject && array.includes(lesson.subject);
        }

        // Grade
        case "grade": {
          const array = toArray(value as string | string[]);
          return lesson.grade && array.includes(lesson.grade);
        }

        // Categories
        case "categoryIds": {
          const array = toArray(value as string | string[]);
          return array.every((id) => lesson.categoryIds.includes(id));
        }

        // Dates
        case "publicationDateBefore": {
          if (!lesson.publicationDate) {
            return false;
          }
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.publicationDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() <= filterDate.valueOf();
        }
        case "publicationDateAfter": {
          if (!lesson.publicationDate) {
            return false;
          }
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.publicationDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() >= filterDate.valueOf();
        }
        case "creationDateBefore": {
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.creationDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() <= filterDate.valueOf();
        }
        case "creationDateAfter": {
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.creationDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() >= filterDate.valueOf();
        }
        case "lastModifiedDateBefore": {
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.lastModifiedDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() <= filterDate.valueOf();
        }
        case "lastModifiedDateAfter": {
          const filterDate = value as Date;
          const lessonDate = new Date(lesson.lastModifiedDate);
          // Check date validity
          if (isNaN(lessonDate.valueOf()) || isNaN(filterDate.valueOf()))
            return false;
          // Check that it respects the filter condition
          return lessonDate.valueOf() >= filterDate.valueOf();
        }
      }
    })
    // Keep lessons that match all filters
    .every(Boolean);
