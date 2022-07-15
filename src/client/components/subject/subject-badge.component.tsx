import { ESubject } from "@typing/subject.enum";
import { Tooltip } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import styles from "./subject-badge.module.scss";

interface SubjectBadgeProps {
  subject: keyof typeof ESubject;
}

export const SubjectBadge = ({ subject }: SubjectBadgeProps) => {
  const subjectText = ESubject[subject];

  return (
    <OverlayTrigger overlay={<Tooltip>{subjectText}</Tooltip>}>
      <Badge pill bg="primary" className={styles.badge}>
        {subjectText}
      </Badge>
    </OverlayTrigger>
  );
};
