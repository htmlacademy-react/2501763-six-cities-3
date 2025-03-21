import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../constants';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './private-route';
import {Offers} from '../types/offer';
import {Reviews} from '../types/review';
import {useAppSelector} from '../hooks/index';
import {selectOffers, selectCurrentCity} from '../store/selectors';
import Loading from '../components/loading';

type AppProps = {
  favoriteOffers: Offers;
  reviews: Reviews;
  cities: string[];
}

export default function App({favoriteOffers, reviews, cities}:AppProps) : JSX.Element {
  const storeOffers = useAppSelector(selectOffers);
  const actualCity = useAppSelector(selectCurrentCity);

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Loading />
    );
  }

  return(
    <HelmetProvider>
      <BrowserRouter>
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
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <Favorites favoriteOffers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer reviews={reviews} offers={storeOffers} actualCity={actualCity}/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
