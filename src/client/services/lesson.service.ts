/**
 * @file Service for querying the API for lessons.
 */
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const lessonApiUrl = "/api/lesson";

/**
 * Fetches all lessons from the API.
 *
 * @param {FetchLessonsParameters} filters The parameters to filter the lessons
 * @return {Promise<ApiResponse<{ lessons: ILesson[] }>>} The lessons.
 * @throws {Error} If the API call fails.
 */
const getLessons = async (
  filters: FetchLessonsParameters = {}
): Promise<ApiResponse<{ lessons: ILesson[] }>> => {
  const searchParams = new URLSearchParams(Object.entries(filters));
  const { data: response } = await axios.get<
    ApiResponse<{ lessons: ILesson[] }>
  >(`${lessonApiUrl}?${searchParams}`);

  return response;
};

const getLessonFileURL = (lesson?: ILesson): string =>
  `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${lesson?.file.filepath}`;

const createCategory = (
  username: string,
  userId: string,
  label: string,
  subject?: string
): Promise<AxiosResponse> => {
  const url: string = "https://api.github.com/repos/SouchetJulie/DevLab/issues";

  const formattedBody = (): string => {
    let body: string = "```json\n";
    body += `{\n  "label": "${label}"`;
    if (subject) {
      body += `,\n  "subject": "${subject}"`;
    }
    body += "\n}\n";
    body += "```";
    return body;
  };

  const body: Record<string, string | string[]> = {
    title: `New category: "${label}"` + (subject ? ` (${subject})` : ""),
    // The indentation is important here for the resulting markdown.
    body: `
- **Catégorie :** ${label}
- **Matière :** ${subject ?? "~~aucune~~"}  
- **Proposé par :** ${username} (${userId})
- **Date :** ${new Date().toLocaleString()}
  
Pour la base de données :
${formattedBody()}
  `,
    labels: ["proposition: categories"],
  };
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ""}`,
    },
  };

  return axios.post(url, body, config);
};

/**
 * Available filters for the `useFetchLessons` hook
 */
interface FetchLessonsParameters {
  /**
   * Whether to fetch the current user's bookmarks only
   */
  bookmarks?: boolean;
  /**
   * Whether to fetch the draft lessons only
   */
  isDraft?: boolean;
  /**
   * Fetches the lessons written by this author only, if defined
   */
  author?: string;
}

export type { FetchLessonsParameters };
export { getLessons, getLessonFileURL, createCategory };
