import { COOKIES } from '../../constants';
import { history } from '../../utils';
import { AppGlobalContainer } from '../AppGlobalContainer';
import cookie from 'js-cookie';
import { ROUTES } from '../Routes';
import styles from './LogoutButton.module.scss';

export const LogoutButton = () => {
  const { setJwtToken } = AppGlobalContainer.useContainer();

  const handleLogout = () => {
    setJwtToken(undefined);
    cookie.set(COOKIES.JWT_TOKEN, '');
    history.replace(ROUTES.LOGIN);
  };

  return (
    <div onClick={handleLogout} className={styles.container}>
      <img className={styles.navItemLogo} src="images/iconSignOutNav.svg"></img>
      <p>Выйти</p>
    </div>
  );
};
