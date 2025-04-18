import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../constants';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route';
import { useAppSelector } from '../../hooks/index';
import Loading from '../loading/loading';
import { getAuthorizationStatus, getAuthCheckedStatus } from '../../store/user-authorization/selectors';
import { getOffersLoadingStatus } from '../../store/offers-load/selectors';
import LoginPrivateRoute from '../login-private-route/login-private-route';

export default function App() : JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isOffersLoading) {
    return (
      <Loading />
    );
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={'/'}
          element={
            <Main/>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <LoginPrivateRoute status={authorizationStatus}>
              <Login/>
            </LoginPrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path={`/${AppRoute.Offer}/:id`}
          element={<Offer/>}
        />
        <Route
          path='*'
          element={<NotFound/>}
        />
      </Routes>
    </HelmetProvider>
  );
}
