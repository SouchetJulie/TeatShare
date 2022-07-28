import styles from "@styles/landing_page/Actualites.module.scss";
import { ILandingPageCardInterface } from "@typing/landing-page-card.interface";
import Link from "next/link";
import Masonry from "react-masonry-css";
import cardData from "../../../fake_data/LandingPage.cards.json";
import LandingCard from "./LandingCard";

type LandingCardData = Pick<
  ILandingPageCardInterface,
  "title" | "course" | "matiere" | "time" | "date"
>;

const Actualites = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1,
  };

  const cards = cardData.map((res: LandingCardData, i: number) => (
    <LandingCard
      key={i}
      course={res.course}
      date={res.date}
      img={i}
      matiere={res.matiere}
      time={res.time}
      title={res.title}
    />
  ));

  return (
    <div className={styles.actualites_container}>
      <h2>Nos actualités</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {cards}
      </Masonry>
      <button className={styles.btnConnexion}>
        <Link href={`/user/login`}>
          <a>Voir tous les cours</a>
        </Link>
      </button>
    </div>
  );
};
export default Actualites;
