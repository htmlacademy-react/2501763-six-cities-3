//import {offers} from '../../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers, changeSort, toggleSortsMenu, resetSort, requireAuthorization, setOffersDataLoadingStatus} from '../action';
import {sortOffers} from '../../components/sort/utils';
import {Sorts} from '../../components/sort/const';
import {AuthorizationStatus} from '../../constants';
import {Offer} from '../../types/offer';

const INITIAL_CITY = 'Paris';

type State = {
  city: string;
  offers: Offer[];
  sortOffers: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
};

const initialState: State = {
  city: INITIAL_CITY,
  offers: [],
  sortOffers: Sorts.POPULAR,
  isFiltersOpen: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortOffers = action.payload;
      state.offers = sortOffers[action.payload]([...state.offers]);
    })
    .addCase(toggleSortsMenu, (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    })
    .addCase(resetSort, (state) => {
      state.sortOffers = Sorts.POPULAR;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
