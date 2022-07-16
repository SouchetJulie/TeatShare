import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import axios, { AxiosResponse } from "axios";
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

    axios
      .delete<ApiResponse>(`/api/lesson/${lessonId}`)
      .then(({ data: response }: AxiosResponse<ApiResponse>) => {
        if (router.pathname.startsWith(`/lesson/${lessonId}`)) {
          router.push("/");
        }

        if (response.success) {
          dispatch(
            addAlert({
              success: true,
              message: `Leçon "${lessonTitle}" supprimée avec succès !`,
              ttl: 2000,
            })
          );
        } else {
          dispatch(
            addAlert({
              success: false,
              message: response.error,
              ttl: 2000,
            })
          );
        }
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
