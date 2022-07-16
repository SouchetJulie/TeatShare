import { EGrade } from "@typing/grade.enum";
import Badge from "react-bootstrap/Badge";

interface GradeBadgeProps {
  grade: keyof typeof EGrade;
}

export const GradeBadge = ({ grade }: GradeBadgeProps) => {
  const gradeText = EGrade[grade];

  return (
    <Badge pill bg="secondary">
      {gradeText}
    </Badge>
  );
};
