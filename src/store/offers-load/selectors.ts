import { NameSpace } from '../../constants';
import { State } from '../../types/state';
import { Offer, ExtendedOffer } from '../../types/offer';

export const getAroundOffers = (state: Pick<State, NameSpace.OffersData>): Offer[] => state[NameSpace.OffersData].aroundOffers;

export const getOffersLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isOffersLoading;

export const getOfferPageLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isOfferLoading;

export const getFavoriteLoadingStatus = (state: Pick<State, NameSpace.OffersData>): boolean => state[NameSpace.OffersData].isFavoriteLoading;

export const getDataOffer = (state: Pick<State, NameSpace.OffersData>): ExtendedOffer | undefined => state[NameSpace.OffersData].offer;

export const getDataCard = (state: Pick<State, NameSpace.OffersData>): Offer | undefined => state[NameSpace.OffersData].offerCard;

export const getOffers = (state: Pick<State, NameSpace.OffersData>): Offer[] => state[NameSpace.OffersData].offers;

export const getFavoriteOffers = (state: Pick<State, NameSpace.OffersData>): Offer[] => state[NameSpace.OffersData].favoriteOffers;

export const selectSortOffers = (state: State): string => state[NameSpace.OffersData].sortOffers;

export const selectIsFiltersOpen = (state: State) => state[NameSpace.OffersData].isFiltersOpen;

export const getFavoritesLength = (state: Pick<State, NameSpace.OffersData>): number=> {
  const favoriteOffers = state[NameSpace.OffersData].offers.filter((item)=>item.isFavorite === true
  );
  return favoriteOffers.length;
};
