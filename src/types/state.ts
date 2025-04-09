import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';
import {Offer, ExtendedOffer} from '../types/offer';
import {Review} from '../types/review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserAuth = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type OffersLoad = {
  offers: Offer[];
  isOffersLoading: boolean;
  offer: ExtendedOffer | undefined;
  aroundOffers: Offer[];
}

export type ReviewsLoad = {
  reviews: Review[];
}

export type AppActions = {
  sortOffers: string;
  isFiltersOpen: boolean;
  activeOfferId: string;
  error: string | null;
  city: string;
}
