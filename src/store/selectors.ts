import {State} from '../types/state';

export const selectOffers = (state: State) => state.offers;

export const selectCurrentCity = (state: State) => state.city;
