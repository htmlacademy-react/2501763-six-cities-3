import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../constants';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './private-route';

type AppProps = {
  rentalOffersAmount: number;
}

export default function App({rentalOffersAmount}: AppProps): JSX.Element {
  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main rentalOffersAmount={rentalOffersAmount} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
