import Image from "next/image";
import Link from "next/link";

import logo from "@public/logos/name.png";
import insta from "@socialIcons/insta.png";
import twitter from "@socialIcons/twitter.png";
import styles from "@styles/LandingPage/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.landing_footer_container}>
      <div className={styles.landing_footer_content}>
        <div className={styles.landing_footer_bloc1}>
          <h2>Suivez nous sur les réseaux !</h2>
          <div className={styles.socialIconsLogos}>
            <Image src={twitter} width="70" height="70" />
            <Image src={insta} width="70" height="70" />
          </div>
        </div>
        <div className={styles.landing_footer_bloc2}>
          <div className={styles.spaceText}>
            <Image src={logo} layout="responsive" className={styles.test} />
            <p>+1 (7635) 547-12-97</p>
            <Link href="">teatshare@live.fr</Link>
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
          <p>© 2022. Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
