import Link from "next/link";
import { FunctionComponent } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

interface LessonEditProps {
  lessonId?: string;
  size: number;
}

export const LessonEdit: FunctionComponent<LessonEditProps> = ({
  lessonId,
  size,
}: LessonEditProps): JSX.Element => (
  <Button variant="outline-primary" className="border-0 rounded-circle p-2">
    <Link href={`/lesson/upload/${lessonId}`}>
      <PencilSquare size={size} />
    </Link>
  </Button>
);
