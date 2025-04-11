import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';
import {Offer, ExtendedOffer} from '../types/offer';
import {Review} from '../types/review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type User = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus;
  user: User| null;
  isLoginFormDasabled: boolean;
  email: string;
};

export type OffersLoad = {
  offers: Offer[];
  sortOffers: string;
  isFiltersOpen: boolean;
  isOffersLoading: boolean;
  offer: ExtendedOffer | undefined;
  aroundOffers: Offer[];
  favoriteOffers: Offer[];

}

export type ReviewsLoad = {
  reviews: Review[];
  isReviewFormDasabled: boolean;
}

export type AppActions = {
  activeOfferId: string;
  error: string | null;
  city: string;
}
