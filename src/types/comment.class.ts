/**
 * A (or several) Comment is put on a LessonFile by any User.
 */
export class Comment {
  _id: string = "";
  publicationDate: Date = new Date();
  content: string = "";
  // foreign keys
  authorId: string;
  lessonFileId: string;

  /**
   * Initializes a new comment, created by this user, on this lessonPost file
   * @param {string} authorId
   * @param {string} lessonFileId
   */
  constructor(authorId: string, lessonFileId: string) {
    this.authorId = authorId;
    this.lessonFileId = lessonFileId;
  }
}
