import Link from "next/link";
import { FunctionComponent } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

interface LessonEditProps {
  lessonId?: string;
  size?: number;
}

export const LessonEdit: FunctionComponent<LessonEditProps> = ({
  lessonId,
  size = 20,
}: LessonEditProps): JSX.Element => (
  <Button variant="none">
    <Link href={`/lesson/upload/${lessonId}`}>
      <PencilSquare size={size} />
    </Link>
  </Button>
);
