import {
  isText,
  parseForm,
  RequestFormData,
  validateArrayStringField,
  validateStringField,
} from "@common/parse-form.utils";
import {
  createNewLesson,
  getOneLesson,
  updateLesson,
} from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { EGrade } from "@typing/grade.enum";
import { ILesson, ILessonCreate } from "@typing/lesson.interface";
import { ESubject } from "@typing/subject.enum";
import { IUserPublic } from "@typing/user.interface";
import { File } from "formidable";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import isBoolean = validator.isBoolean;
import isAlpha = validator.isAlpha;
import isHexadecimal = validator.isHexadecimal;

const readUploadedLesson = async (req: NextApiRequest) => {
  const formData: RequestFormData = await parseForm(req, /^application\/pdf$/);

  const title: string = validateStringField(
    formData?.fields?.title,
    isText,
    "Titre manquant ou invalide",
    false
  )!;
  const subtitle: string | undefined = validateStringField(
    formData?.fields?.subtitle,
    isText,
    "Sous-titre invalide"
  );
  const isDraft: string = validateStringField(
    formData?.fields?.isDraft,
    isBoolean,
    "Choix brouillon/publication manquant.",
    false
  )!;
  const subject: string | undefined = validateStringField(
    formData?.fields?.subject,
    isAlpha,
    "Matière invalide"
  );
  const grade: string | undefined = validateStringField(
    formData?.fields?.grade,
    isAlpha,
    "Classe invalide"
  );

  const _id: string | undefined = validateStringField(
    formData?.fields?._id,
    isHexadecimal,
    "Id invalide"
  );
  const categoryIds: string[] = validateArrayStringField(
    formData?.fields?.categoryIds,
    isHexadecimal,
    "Catégories invalides"
  );

  // Get file
  let file: File | undefined;
  if (formData?.files?.file instanceof Array) {
    file = formData.files.file[0];
  } else {
    file = formData.files?.file;
  }

  const lessonCreate: ILessonCreate = {
    _id,
    title,
    subtitle,
    categoryIds,
    subject: subject as keyof typeof ESubject,
    grade: grade as keyof typeof EGrade,
    isDraft: JSON.parse(isDraft), // conversion to boolean
  };
  return { lessonCreate, file };
};

/**
 * Parses the incoming request to record a new lesson or update an existing one.
 * @param {NextApiRequest} req Incoming request.
 * @param {NextApiResponse} res Whether the recording succeeded, and the reasons why not otherwise.
 */
export const lessonCreateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>
) => {
  try {
    // Get author
    const currentUser: IUserPublic | undefined = req.session.user;

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: "Il faut se connecter pour effectuer cette action.",
      });
    }

    // Read form
    const { lessonCreate, file } = await readUploadedLesson(req);

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Fichier manquant.",
      });
    }

    // Create the lesson
    const { id } = await createNewLesson(currentUser, file, lessonCreate);
    currentUser.lessonIds.push(id.toString());
    await req.session.save();

    // Read the final uploaded lesson
    const uploadedLesson: ILesson | null = await getOneLesson(id);

    if (!uploadedLesson) {
      console.log(
        "[LESSON] Creation of lesson failed: uploaded lesson not found"
      );
      return res.status(500).json({
        success: false,
        error: "Créer la leçon a échoué.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        lesson: uploadedLesson,
      },
    });
  } catch (e) {
    console.log(`[LESSON] Creation of lesson failed:`, e);
    return res.status(500).json({
      success: false,
      error: "Créer la leçon a échoué.",
    });
  }
};

export const lessonUpdateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>
) => {
  try {
    // Get author
    const currentUser: IUserPublic | undefined = req.session.user;

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: "Il faut se connecter pour effectuer cette action.",
      });
    }

    // Read form
    const { file, lessonCreate } = await readUploadedLesson(req);

    // Update the lesson
    const { id } = await updateLesson(currentUser, file, lessonCreate);

    // Read the final uploaded lesson
    const uploadedLesson: ILesson | null = await getOneLesson(id);

    if (!uploadedLesson) {
      console.log("[LESSON] Edit of lesson failed: uploaded lesson not found");
      return res.status(500).json({
        success: false,
        error: "Modifier la leçon a échoué.",
      });
    }
  } catch (e) {
    console.log(`[LESSON] Edit of lesson failed:`, e);
    return res.status(500).json({
      success: false,
      error: "Modifier la leçon a échoué.",
    });
  }
};
