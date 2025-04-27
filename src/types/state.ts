import { store } from '../store/index';
import { AuthorizationStatus } from '../constants';
import { Offer, ExtendedOffer } from '../types/offer';
import { Review } from '../types/review';

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
  user: User | null;
  isLoginFormDisabled: boolean;
};

export type OffersLoad = {
  offers: Offer[];
  isOffersLoading: boolean;
  offerCard: Offer | undefined;
  offer: ExtendedOffer | undefined;
  aroundOffers: Offer[];
  favoriteOffers: Offer[];
  isOfferLoading: boolean;
  isFavoriteLoading: boolean;
  favoriteStatus: boolean;
}

export type ReviewsLoad = {
  reviews: Review[];
  isReviewFormDisabled: boolean;
}

export type AppActions = {
  sort: string;
  activeOfferId: string;
  error: string | null;
}
