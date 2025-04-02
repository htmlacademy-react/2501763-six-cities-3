import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../constants';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './private-route';
import {Offers} from '../types/offer';
import {useAppSelector} from '../hooks/index';
import {selectOffers, selectCurrentCity} from '../store/selectors';
import Loading from '../components/loading';
import HistoryRouter from '../components/history-route/history-route';
import browserHistory from '../components/browser-history';

type AppProps = {
  favoriteOffers: Offers;
  cities: string[];
}

export default function App({favoriteOffers, cities}:AppProps) : JSX.Element {
  const storeOffers = useAppSelector(selectOffers);
  const actualCity = useAppSelector(selectCurrentCity);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
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
            element={<Main cities={cities} actualCity={actualCity} offers={storeOffers}/>}
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
                <Favorites favoriteOffers={favoriteOffers}/>
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
