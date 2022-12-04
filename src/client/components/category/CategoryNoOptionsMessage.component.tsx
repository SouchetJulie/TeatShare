import { FunctionComponent } from "react";
import styles from "./category.module.scss";

interface CategoryNoOptionsMessageProps {
  onClick: VoidFunction;
}

const CategoryNoOptionsMessage: FunctionComponent<CategoryNoOptionsMessageProps> = ({
  onClick,
}) => (
  <a className={styles.link} onClick={onClick}>
    Proposer une nouvelle catégorie ?
  </a>
);

export default CategoryNoOptionsMessage;
