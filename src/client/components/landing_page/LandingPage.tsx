import { FunctionComponent } from "react";
import styles from "../../styles/landing_page/LandingPage.module.scss";
import Access from "./Access";
import Accueil from "./Accueil";
import Actualites from "./Actualites";
import Temoignage from "./Temoignage";

const LandingPage: FunctionComponent = () => (
  <div className={styles.container}>
    <Accueil />
    <Access />
    <Temoignage />
    <Actualites />
  </div>
);

export default LandingPage;
