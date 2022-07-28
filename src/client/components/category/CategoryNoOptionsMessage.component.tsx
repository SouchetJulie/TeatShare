import { FunctionComponent } from "react";
import styles from "./category.module.scss";

interface CategoryNoOptionsMessage {
  onClick: VoidFunction;
}

const CategoryNoOptionsMessage: FunctionComponent<CategoryNoOptionsMessage> = ({
  onClick,
}) => (
  <a className={styles.link} onClick={onClick}>
    Proposer une nouvelle catégorie ?
  </a>
);

export default CategoryNoOptionsMessage;
