import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";

import styles from "@styles/Menu/navbar.module.scss";
import { EGrade } from "@typing/grade.enum";

interface ClassLinkItemProps {
  name: EGrade;
}

const GradeLinkItem: FunctionComponent<ClassLinkItemProps> = ({
  name,
}: ClassLinkItemProps) => (
  <Nav.Link href={`/lesson?class=${name}`} className="ms-3 ms-md-0">
    <Badge bg="secondary" pill>
      {name}
    </Badge>
  </Nav.Link>
);

interface Props {
  show?: boolean;
}

/**
 * Links for each grade.
 * @constructor
 */
const GradeLinks: FunctionComponent<Props> = ({ show }: Props) => {
  const grades = Object.values(EGrade);
  return (
    <div className={styles.gradeBadges}>
      <hr />
      {show
        ? grades.map((grade: EGrade) => (
            <GradeLinkItem key={`grade-link-${grade}`} name={grade} />
          ))
        : null}
    </div>
  );
};

export default GradeLinks;
