import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app';
import {favoriteOffers} from './mocks/favorite-offers';
import {reviews} from './mocks/reviews';
import {cities} from './constants';
import {store} from './store/index';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        favoriteOffers={favoriteOffers}
        reviews={reviews}
        cities={cities}
      />
    </Provider>
  </React.StrictMode>
);
