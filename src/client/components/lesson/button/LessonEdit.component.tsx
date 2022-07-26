import Link from "next/link";
import { FunctionComponent, MouseEvent } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

interface LessonEditProps {
  lessonId?: string;
  size: number;
}

export const LessonEdit: FunctionComponent<LessonEditProps> = ({
  lessonId,
  size,
}: LessonEditProps): JSX.Element => {
  const onClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Button variant="outline-primary" className="border-0 rounded-circle p-2">
      <Link href={`/lesson/${lessonId}/edit`}>
        <PencilSquare size={size} onClick={onClick} />
      </Link>
    </Button>
  );
};
