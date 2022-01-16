import styles from '../../styles/LandingPage/Actualites.module.scss';
import Link from "next/link";
import cardData from '../../../public/FakeDatas/LandingPage.cards.json';
import LandingCard from "./LandingCard";
import Masonry from 'react-masonry-css'

const Actualites = () => {

    const cards = cardData.map((res,i) => (
            <LandingCard
                key={i}
                course={res.course}
                date={res.date}
                img={res.img.replace('XXX', `cours${i + 1}.png`)}
                matiere={res.matiere}
                time={res.time}
                title={res.title}
                />));

    return (
        <div className={styles.actualites_container}>
            <h2>Nos p’tites actus.</h2>
            <Masonry
                breakpointCols={3}
                className={styles.myMasonryGrid}
                columnClassName={styles.myMasonryGridColumn}
            >
                {cards}
            </Masonry>
            <button>
                <Link href={`/user/login`} >
                    <a className={styles.connexion}>Voir tous les cours</a>
                </Link>
            </button>

        </div>
    );
};
export default Actualites;