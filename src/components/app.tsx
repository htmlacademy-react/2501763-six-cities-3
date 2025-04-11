import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../constants';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './private-route';
import {useAppSelector} from '../hooks/index';
import Loading from '../components/loading';
import HistoryRouter from '../components/history-route/history-route';
import browserHistory from '../components/browser-history';
import {getAuthorizationStatus, getAuthCheckedStatus} from '../store/user-authorization/selectors';
import {getOffersLoadingStatus} from '../store/offers-load/selectors';
import {getOffers} from '../store/offers-load/selectors';
import {getCity} from '../store/app-actions/selectors';

export default function App(): JSX.Element {
  const storeOffers = useAppSelector(getOffers);
  const actualCity = useAppSelector(getCity);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  if (!isAuthChecked || isOffersLoading) {
    return (
      <Loading />
    );
  }

  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main actualCity={actualCity} offers={storeOffers}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<Login/>}
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
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
