import { FunctionComponent } from "react";
import styles from '../../styles/LandingPage/Accueil.module.scss';
import Link from "next/link";
import Image from 'next/image';
import {ILandingPageCardInterface} from "../../../types/ILandingPageCard.interface";

import img1 from '@imgCours/cours1.png';
import img2 from '@imgCours/cours2.png';
import img3 from '@imgCours/cours3.png';
import img4 from '@imgCours/cours4.png';
import img5 from '@imgCours/cours5.png';
import img6 from '@imgCours/cours6.png';


const LandingCard: FunctionComponent<ILandingPageCardInterface> = (
    {
        course,
        date,
        img,
        matiere,
        time,
        title
    }) =>{
  const imgArray = [img1, img2, img3, img4, img5, img6];
    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardImg}>
                  <Image
                    src={imgArray[img]}
                    alt='Cours'
                  />
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