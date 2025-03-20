import {offers} from '../../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers, changeSort, toggleSortsMenu, resetSort} from '../action';
import {sortOffers} from '../../components/sort/utils';
import {Sorts} from '../../components/sort/const';

const INITIAL_CITY = 'Paris';

const initialState = {
  city: INITIAL_CITY,
  offers: offers,
  sortOffers: Sorts.POPULAR,
  isFiltersOpen: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state) => {
      state.offers = offers;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortOffers = action.payload;
      state.offers = sortOffers[action.payload]([...offers]);
    })
    .addCase(toggleSortsMenu, (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    })
    .addCase(resetSort, (state) => {
      state.sortOffers = Sorts.POPULAR;
    });
});
