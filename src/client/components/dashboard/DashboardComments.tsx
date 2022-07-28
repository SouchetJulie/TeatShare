import styles from "@styles/dashboard/dashboard.module.scss";
import { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";

interface Props {}

const DashboardComments: FunctionComponent<Props> = ({}: Props) => {
  const tab = [1, 2];
  return (
    <div className={styles.commentContainer}>
      <h4>Mes commentaires</h4>
      {tab.map(() => {
        return (
          <div className={styles.comment}>
            <div>
              <p>Geometrie dans l'espace</p>
              <p className={styles.date}>15 / 12 / 2022 </p>
            </div>
            <span>Maths</span>
            <hr />
          </div>
        );
      })}
      <Button variant="secondary">Voir tous mes composants</Button>
    </div>
  );
};

export default DashboardComments;
