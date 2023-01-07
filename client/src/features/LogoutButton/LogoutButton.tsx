import { COOKIES } from '../../constants';
import { history } from '../../utils';
import { AppGlobalContainer } from '../AppGlobalContainer';
import cookie from 'js-cookie';
import { ROUTES } from '../Routes';

export const LogoutButton = () => {
  const { setJwtToken } = AppGlobalContainer.useContainer();

  const handleLogout = () => {
    setJwtToken(undefined);
    cookie.set(COOKIES.JWT_TOKEN, '');
    history.replace(ROUTES.LOGIN);
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
};
