import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Fields, File, Files, IncomingForm, Part } from "formidable";

import { withSession } from "@middlewares/session.middleware";
import { createNewLesson } from "@services/lessons.service";
import { IUserPublic } from "@typing/user.interface";
import { ILessonCreate } from "@typing/lesson-file.interface";

interface LessonFormData {
  fields?: Fields;
  files?: Files;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData: LessonFormData & { error?: string } = await new Promise(
      (resolve, reject) => {
        const form = new IncomingForm({
          keepExtensions: false,
          hashAlgorithm: "sha256",
          multiples: false,
          filter: ({ mimetype }: Part) => mimetype && mimetype.includes("pdf"), // keep only pdf
        });

        form.parse(req, (err, fields: Fields, files: Files) => {
          if (err) {
            return reject(err);
          }
          resolve({ fields, files });
        });
      }
    ).catch((err) => ({ error: err }));

    // Error handling
    if (formData.error) {
      return res.status(400).json({ error: formData.error });
    }

    // Get author
    const currentUser: IUserPublic = req.session.user;

    // Get file
    let file: File;
    if (formData?.files?.file instanceof Array) {
      file = formData.files.file[0];
    } else {
      file = formData.files.file;
    }

    // Get isDraft
    let isDraft: string;
    if (formData?.fields.isDraft instanceof Array) {
      isDraft = formData?.fields.isDraft[0];
    } else {
      isDraft = formData?.fields.isDraft;
    }

    const uploadedLesson: ILessonCreate = {
      ...formData.fields,
      isDraft: JSON.parse(isDraft), // conversion to boolean
    };

    const result = await createNewLesson(currentUser, file, uploadedLesson);
    if ("id" in result) {
      const id = result.id;

      currentUser.lessonIds.push(id);
      await req.session.save();

      return res.status(200).json({ success: true, id });
    } else {
      return res.status(400).json({ success: false, error: result["error"] });
    }
  } catch (e) {
    return res.status(400).json({ success: false, error: e.message });
  }
};

export const lessonPostHandler: NextApiHandler = withSession(handler);
