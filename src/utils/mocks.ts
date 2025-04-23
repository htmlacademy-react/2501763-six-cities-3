import { system, name, internet, datatype, image } from 'faker';
import { User } from '../types/state';
import { Offer, ExtendedOffer, City } from '../types/offer';
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
  id: datatype.string(),
  title: name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Paris',
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
  isFavorite: false,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});


export const makeFakeFavoriteOfferCard = (): Offer => ({
  id: datatype.string(),
  title: name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Paris',
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
  isFavorite: true,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const makeFakeOfferPage = (): ExtendedOffer => ({
  id: datatype.string(),
  city: {
    name: datatype.string(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    }
  },
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

export const makeFakeCity = (): City => ({
  name: datatype.string(),
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  }
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    isLoginFormDisabled: false
  },
  offers: {
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
  actions: {
    activeOfferId: '',
    error: null
  },
  reviews: {
    reviews: [],
    isReviewFormDisabled: false
  },
  ...initialState ?? {},
});
