import styles from '../../styles/LandingPage/Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logos/name.png'
import insta from '../../../public/LandingPage/socialIcons/insta.png'
import twitter from '../../../public/LandingPage/socialIcons/twitter.png'

const Footer = () => {
    return (
        <div className={styles.landing_footer_container}>
            <div className={styles.landing_footer_content}>
                <div className={styles.landing_footer_bloc1}>
                    <h2>Suivez nous sur les reseaux !</h2>
                    <div>
                        <Image src={twitter}  width='70px'  height='70px' />
                        {/* pas reussi a export le facebook*/}
                        <Image src={twitter} width='70px'  height='70px' />
                        <Image src={insta} width='70px'  height='70px'/>
                    </div>
                </div>
                <div className={styles.landing_footer_bloc2}>
                    <div>
                        <Image src={logo} layout='responsive' className={styles.test} />
                        <p>+1 (7635) 547-12-97</p>
                        <Link href='' >
                            <a>teatshare@live.fr</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/' >
                            <a>Lien</a>
                        </Link>
                        <Link href='/' >
                            <a>Contact</a>
                        </Link>
                        <Link href='/' >
                            <a>Credits</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/' >
                            <a>Protection des données</a>
                        </Link>
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