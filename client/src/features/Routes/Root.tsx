import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';
import { LoginPage } from '../LoginPage';
import { CourseRegistration } from '../CourseRegistration';
import { PrivateRoute } from './PrivateRoute';
import { UserRegistrationPage } from '../UserRegistrationPage';
import { CourseList } from '../CourseList';

export const Root = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={ROUTES.REGISTER} component={UserRegistrationPage} />
      <PrivateRoute exact path={ROUTES.ROOT} component={CourseRegistration} />
      <PrivateRoute exact path={ROUTES.COURSES} component={CourseList} />
    </Switch>
  );
};
