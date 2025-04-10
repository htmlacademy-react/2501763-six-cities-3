import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Offer, ExtendedOffer} from '../../types/offer';

export const getAroundOffers = (state: State): Offer[] => state[NameSpace.OffersData].aroundOffers;

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOffersLoading;

export const getDataOffer = (state: State): ExtendedOffer |undefined => state[NameSpace.OffersData].offer;

export const getOffers = (state: State): Offer[]=> state[NameSpace.OffersData].offers;

export const selectSortOffers = (state: State): string => state[NameSpace.OffersData].sortOffers;

export const selectIsFiltersOpen = (state: State)=> state[NameSpace.OffersData].isFiltersOpen;
