import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from './constants';
import { AppGlobalContainer } from '../AppGlobalContainer';

type PrivateRouteProps = Pick<RouteProps, 'component' | 'location'>;

const PrivateRouteComponent = (props: PrivateRouteProps) => {
  const { jwtToken } = AppGlobalContainer.useContainer();
  if (!Boolean(jwtToken)) {
    return (
      <Redirect
        to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
      />
    );
  }

  return <Route {...props} />;
};

export const PrivateRoute = ({ component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={({ location }) => (
      <PrivateRouteComponent
        component={component}
        location={location}
        {...rest}
      />
    )}
  />
);
