import {State} from '../types/state';

export const selectOffers = (state: State) => state.offers;

export const selectCurrentCity = (state: State) => state.city;

export const selectSortOffers = (state: State) => state.sortOffers;

export const selectIsFiltersOpen = (state: State) => state.isFiltersOpen;
