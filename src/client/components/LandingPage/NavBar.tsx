import logo from '../../../../public/logos/name.png';
import Image from 'next/image';
import styles from '../../styles/LandingPage/NavBar.module.scss';
import Link from 'next/link';

const NavBar = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.img_container}>
                <Image
                    src={logo}
                    alt='Logo'
                    layout='responsive'
                />
            </div>

            <div className={styles.navigationLink}>
                <li>
                  <Link href='/user/login'>
                    <a>Se connecter</a>
                  </Link>
                </li>
                <li>
                  <Link href='/user/signup'>
                    S&apos;inscrire
                  </Link>
                </li>
                <li>
                    <div className={styles.profileLiContainer}>
                        <div className={styles.profilePicContainer}>
                             <Image
                                 src={logo}
                                 alt='avatar'
                                 layout='responsive'
                                 object-position='center'
                                 objectFit='cover'
                                 width={10}
                                 height={10}

                             />
                        </div>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default NavBar