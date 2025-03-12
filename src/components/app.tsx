import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../constants';
import Main from '../pages/main/main';
import MainEmpty from '../pages/main-empty/main-empty';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from './private-route';
import {Offers} from '../types/offer';
import {Reviews} from '../types/review';
import {useAppSelector} from '../hooks/index';
import {getOffersByCity} from '../pages/main/common';

type AppProps = {
  favoriteOffers: Offers;
  reviews: Reviews;
  cities: string[];
}

export default function App({favoriteOffers, reviews, cities}:AppProps) : JSX.Element {
  const storeOffers = useAppSelector((state)=>state.offers);
  const actualCity = useAppSelector((state) => state.city);
  const filtredOffersByCity = getOffersByCity(actualCity, storeOffers);
  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={filtredOffersByCity.length > 0 ? <Main cities={cities} actualCity={actualCity} offers={storeOffers}/> : <MainEmpty cities={cities}/>}
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
