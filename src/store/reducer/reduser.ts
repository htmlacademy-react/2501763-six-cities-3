import {offers} from '../../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers} from '../action';

const INITIAL_CITY = 'Paris';

const initialState = {
  city: INITIAL_CITY,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state) => {
      state.offers = offers;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
