import { FunctionComponent } from "react";
import styles from "../../styles/landing_page/LandingPage.module.scss";
import Accueil from "./Accueil";
import Access from "./Access";
import Temoignage from "./Temoignage";
import Actualites from "./Actualites";

const LandingPage: FunctionComponent = () => (
  <div className={styles.container}>
    <Accueil />
    <Access />
    <Temoignage />
    <Actualites />
  </div>
);

export default LandingPage;
