import Image from "next/image";
import Link from "next/link";

import logo from "@public/logos/name.png";
// Social icons
import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";
import insta from "@socialIcons/insta.png";
import twitter from "@socialIcons/twitter.png";
import styles from "@styles/landing_page/Footer.module.scss";
import { FunctionComponent } from "react";

interface FooterProps {
  isAuthenticated: boolean;
}
const classes = ["CP", "CE1", "CE2", "CM1", "CM2"];

const Footer: FunctionComponent<FooterProps> = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <FooterAuthenticated /> : <FooterLanding />}</>;
};
/**
 * Footer used on the landing page only
 * @return {JSX}
 */
const FooterLanding: FunctionComponent = (): JSX.Element => {
  return (
    <footer className={styles.landing_footer_container}>
      <div className={styles.landing_footer_content}>
        <div className={styles.landing_footer_bloc1}>
          <h6>Suivez nous sur les réseaux !</h6>
          <div className={styles.socialIconsLogos}>
            <Facebook color="#009FB7" size={40} />
            <Instagram color="#009FB7" size={40} />
            <Twitter color="#009FB7" size={40} />
          </div>
        </div>
        <div className={styles.landing_footer_bloc2}>
          <div className={styles.spaceText}>
            <Image src={logo} layout="responsive" className={styles.test} />
            <p>+1 (7635) 547-12-97</p>
            <Link href="/">teatshare@live.fr</Link>
          </div>
          <div>
            <Link href="/">Lien</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Credits</Link>
          </div>
          <div>
            <Link href="/">Protection des données</Link>
          </div>
        </div>
        <div className={styles.landing_footer_bloc3}>
          © 2022. Tous droits réservés
        </div>
      </div>
    </footer>
  );
};
/**
 * Footer used on every other pages/routes
 * @return {JSX}
 */
const FooterAuthenticated: FunctionComponent = (): JSX.Element => {
  return (
    <footer className={styles.landing_footer_container}>
      <div className={styles.landing_footer_content}>
        <div>
          <p>Bibliothèque</p>
          {classes.map((classLabel: string) => (
            <Link href={`/lesson?subject=${classLabel}`}>{classLabel}</Link>
          ))}
        </div>
        <div>
          <p>Profil</p>
          <Link href={"/user/for_later"}>À lire plus tard</Link>
          <Link href={"/user/settings"}>Paramètres</Link>
          <Link href={"/lesson"}>Mes contributions</Link>
        </div>
        <div>
          <p>Liens</p>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/mentions"}>Mentions légales</Link>
          <Link href={"/a_propos"}>À propos</Link>
          <Link href={"/faq"}>FAQ</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
