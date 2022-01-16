import logo from '../../../../public/logos/name.png';
import Image from 'next/image';
import styles from '../../styles/LandingPage/NavBar.module.scss'

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
                    Se connecter
                </li>
                <li>
                    S&apos;inscrire
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