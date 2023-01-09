import { Link } from 'react-router-dom';
import { ROUTE, ROUTES } from '../../features/Routes';
import styles from './Navigation.module.scss';
import { LogoutButton } from '../../features/LogoutButton';
import { AppGlobalContainer } from '../../features/AppGlobalContainer';

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
  const { jwtToken } = AppGlobalContainer.useContainer();

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
            {Boolean(jwtToken) ? (
              <>
                {' '}
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
                <LogoutButton />
              </>
            ) : (
              <>
                <NavigationItem
                  label={<p>Войти</p>}
                  route={ROUTES.LOGIN}
                  logo={
                    <img
                      className={styles.navItemLogo}
                      src="images/iconSignOutNav.svg"
                    ></img>
                  }
                />

                <NavigationItem
                  label={<p>Регистрация</p>}
                  route={ROUTES.REGISTER}
                  logo={
                    <img
                      className={styles.navItemLogo}
                      src="images/iconNav3.svg"
                    ></img>
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
