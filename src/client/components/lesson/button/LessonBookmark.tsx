import { toggleBookmark } from "@client/services/user.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import {
  addBookmark,
  removeBookmark,
  selectAuthenticatedUser,
} from "@stores/user.store";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { AxiosError, AxiosResponse } from "axios";
import { FunctionComponent } from "react";
import { BookmarkCheck, BookmarkCheckFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

interface LessonBookmarkProps {
  lessonId: string;
  size: number;
}

const LessonBookmark: FunctionComponent<LessonBookmarkProps> = ({
  lessonId,
  size,
}: LessonBookmarkProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const user: IUserPublic | undefined = useAppSelector(selectAuthenticatedUser);

  const isBookmarked: boolean = user?.bookmarkIds.includes(lessonId) ?? false;

  const onBookmarkClick = () => {
    toggleBookmark(lessonId, isBookmarked)
      .then(({ data: response }: AxiosResponse<ApiResponse>) => {
        if (response.success) {
          dispatch(
            addAlert({
              success: true,
              message: `Marque-page ${isBookmarked ? "supprimé" : "ajouté"} !`,
              ttl: 1500,
            })
          );

          if (isBookmarked) {
            dispatch(removeBookmark(lessonId));
          } else {
            dispatch(addBookmark(lessonId));
          }
        } else {
          addAlert({
            success: false,
            message: `Échec lors de ${
              isBookmarked ? "la suppression" : "l'ajout"
            } du marque-page : ${response.error}`,
          });
        }
      })
      .catch((e: AxiosError) =>
        addAlert({
          success: false,
          message: `Échec lors de ${
            isBookmarked ? "la suppression" : "l'ajout"
          } du marque-page : ${getAxiosErrorMessage(e)}`,
        })
      );
  };

  return (
    <Button
      variant={isBookmarked ? "outline-primary" : "outline-secondary"}
      className="border-0 rounded-circle p-2"
      onClick={onBookmarkClick}
    >
      {isBookmarked ? (
        <BookmarkCheckFill size={size} />
      ) : (
        <BookmarkCheck size={size} />
      )}
    </Button>
  );
};

export default LessonBookmark;
