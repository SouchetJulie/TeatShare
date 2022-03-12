import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";

import styles from "@styles/menu/navbar.module.scss";
import { EGrade } from "@typing/grade.enum";
import Link from "next/link";

interface ClassLinkItemProps {
  name: EGrade;
}

const GradeLinkItem: FunctionComponent<ClassLinkItemProps> = ({
  name,
}: ClassLinkItemProps) => (
  <Nav.Link
    as={Link}
    href={`/?class=${name}`}
    passHref
    className="ms-3 ms-md-0"
  >
    <a>
      <Badge bg="secondary" pill>
        {name}
      </Badge>
    </a>
  </Nav.Link>
);

interface Props {
  show?: boolean;
}

/**
 * Links for each grade.
 * @constructor
 */
const GradeLinks: FunctionComponent<Props> = ({ show = true }: Props) => {
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
