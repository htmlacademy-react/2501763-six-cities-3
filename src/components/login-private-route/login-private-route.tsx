import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../constants';

type LoginRouteProps = {
  status: AuthorizationStatus;
  children: JSX.Element;
}

export default function LoginPrivateRoute(props: LoginRouteProps): JSX.Element {
  const { status, children } = props;
  return (
    status === AuthorizationStatus.Auth ?
      <Navigate to={AppRoute.Main} /> :
      children
  );
}
