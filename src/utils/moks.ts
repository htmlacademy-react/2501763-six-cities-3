import { system, name, internet, database, datatype, address, image } from 'faker';
import { User } from '../types/state';
import { Offer, ExtendedOffer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../constants';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  isPro: false,
  name: name.title(),
  token: system.fileExt(),
} as User);

export const makeFakeOfferCard = (): Offer => ({
  id: database.column(),
  title: name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: address.city(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const makeFakeOfferPage = (): ExtendedOffer => ({
  id: database.column(),
  title: name.title(),
  type: name.title(),
  price: datatype.number(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: name.title(),
  bedrooms: datatype.number(),
  goods: [datatype.string()],
  host: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  images: [image.imageUrl()],
  maxAdults: datatype.number(),
});

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  date: datatype.string(),
  user: {
    name: datatype.string(),
    avatarUrl: datatype.string(),
    isPro: datatype.boolean()
  },
  comment: datatype.string(),
  rating: datatype.number(),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    isLoginFormDisabled: false,
    email: ''
  },
  DATA_OFFERS: {
    offers: [],
    sortOffers: '',
    isFiltersOpen: false,
    isOffersLoading: false,
    offerCard: undefined,
    offer: undefined,
    aroundOffers: [],
    favoriteOffers: [],
    isOfferLoading: false,
    isFavoriteLoading: false,
    favoriteStatus: false,
  },
  APP_ACTIONS: {
    activeOfferId: '',
    error: null
  },
  DATA_REVIEWS: {
    reviews: [],
    isReviewFormDisabled: false
  },
  ...initialState ?? {},
});
