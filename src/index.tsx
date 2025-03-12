import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app';
import {favoriteOffers} from './mocks/favorite-offers';
import {reviews} from './mocks/reviews';
import {cities} from './constants';
import {store} from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        favoriteOffers = {favoriteOffers}
        reviews = {reviews}
        cities = {cities}
      />
    </Provider>
  </React.StrictMode>
);
