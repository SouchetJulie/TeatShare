import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

interface LessonDeleteProps {
  lessonId?: string;
  lessonTitle?: string;
  size: number;
}

export const LessonDelete: FunctionComponent<LessonDeleteProps> = ({
  lessonId,
  lessonTitle,
  size,
}: LessonDeleteProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const deleteLesson = () => {
    closeModal();

    let success: boolean;
    let message: string;
    let ttl: number;
    axios
      .delete<ApiResponse>(`/api/lesson/${lessonId}`)
      .then(({ data: response }: AxiosResponse<ApiResponse>) => {
        if (router.pathname.startsWith(`/lesson/${lessonId}`)) {
          router.push("/");
        }

        if (response.success) {
          success = true;
          message = `Leçon ${lessonTitle} supprimée avec succès`;
          ttl = 2000;
        } else {
          success = false;
          message = `Suppression échouée : ${response.error}`;
          ttl = 5000;
        }
      })
      .catch((err: AxiosError) => {
        success = false;
        message = `Suppression échouée : ${getAxiosErrorMessage(err)}`;
        ttl = 5000;
      })
      .finally(() => {
        dispatch(
          addAlert({
            success,
            message,
            ttl,
          })
        );
      });
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="border-0 rounded-circle p-2"
        onClick={openModal}
      >
        <TrashFill size={size} />
      </Button>

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression d'une leçon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Est-ce que vous êtes sûr(e) de vouloir supprimer la leçon "
          {lessonTitle}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={deleteLesson}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
