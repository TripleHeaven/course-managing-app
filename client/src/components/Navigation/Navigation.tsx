import { Link } from 'react-router-dom';
import { ROUTE, ROUTES } from '../../features/Routes';
import styles from './Navigation.module.scss';
import { LogoutButton } from '../../features/LogoutButton';

interface NavigationItemProps {
  label: React.ReactNode;
  route: ROUTE;
  logo?: React.ReactNode;
}

export const NavigationItem = ({ label, route, logo }: NavigationItemProps) => {
  return (
    <Link to={route} className={styles.link}>
      <div className={styles.linkContainer}>
        {logo} {label}
      </div>
    </Link>
  );
};

export const Navigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.innerContainer}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src="images/shyladyface1924.svg"
              alt="logo"
            />
            <p>Course base</p>
          </div>

          <div className={styles.navItemsContainer}>
            <NavigationItem
              label={<p>Добавить курс</p>}
              route={ROUTES.ROOT}
              logo={
                <img
                  className={styles.navItemLogo}
                  src="images/iconNav1.svg"
                ></img>
              }
            />

            <NavigationItem
              label={<p>Курсы</p>}
              route={ROUTES.COURSES}
              logo={
                <img
                  className={styles.navItemLogo}
                  src="images/iconNav2.svg"
                ></img>
              }
            />

            <NavigationItem
              label={<p>Test</p>}
              route={ROUTES.COURSES}
              logo={
                <img
                  className={styles.navItemLogo}
                  src="images/iconNav3.svg"
                ></img>
              }
            />

            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
