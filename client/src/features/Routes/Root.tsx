import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import { LoginPage } from '../LoginPage';
import { CourseRegistration } from '../CourseRegistration';
import { PrivateRoute } from './PrivateRoute';

export const Root = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      {/* <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} /> */}
      {/* <PrivateRoute path={ROUTES.ROOT} component={MainPage} /> */}
      <PrivateRoute exact path={ROUTES.ROOT} component={CourseRegistration} />
    </Switch>
  );
};
