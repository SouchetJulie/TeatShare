import { FunctionComponent } from "react";
import styles from '../../styles/LandingPage/Accueil.module.scss';
import Link from "next/link";
import Image from 'next/image';
import {ILandingPageCardInterface} from "../../../types/ILandingPageCard.interface";

const LandingCard: FunctionComponent<ILandingPageCardInterface> = (
    {
        course,
        date,
        img,
        matiere,
        time,
        title
    }) =>{


    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardImg}>
                {/*  <Image
                    src={img}
                    width={100}
                    height={100}
                  />*/}
            </div>
            <div className={styles.thematic}>
                <span className={styles.matiere}>{matiere}</span>
                <span className={styles.course}>{course}</span>
            </div>
            <div className={styles.cardDate}>

                <p>{time}, {date}</p>
            </div>
            <div className={styles.cardTitle}>{title}</div>
            <button>
                <Link href={"/"} >
                    <a className={styles.readMore}>Lire la suite</a>
                </Link>
            </button>
        </div>
    );
};
export default LandingCard;