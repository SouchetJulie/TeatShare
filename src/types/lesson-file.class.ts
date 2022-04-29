/**
 * Meta data about a lessonDetails file
 */
export class LessonFile {
  _id: string = "";
  title: string = "";
  subtitle: string = "";
  file?: File;
  creationDate: Date = new Date();
  publicationDate?: Date;
  isDraft: boolean = true;
  // foreign keys
  authorId: string;
  categoryIds: string[] = [];
  tagIds: string[] = [];
  commentIds: string[] = [];

  /**
   * Initializes a new lessonDetails file, created by this user
   * @param {string} authorId
   */
  constructor(authorId: string) {
    this.authorId = authorId;
  }
}
