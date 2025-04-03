import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers, changeSort, toggleSortsMenu, resetSort, requireAuthorization, setOffersDataLoadingStatus, setEmail, loadReviews, loadAroundOffers, setComment, setRating, loadOffer, hoverOffer, setError, submitReviewAction} from '../action';
import {sortOffers} from '../../components/sort/utils';
import {Sorts} from '../../components/sort/const';
import {AuthorizationStatus} from '../../constants';
import {Offer, ExtendedOffer} from '../../types/offer';
import {Review} from '../../types/review';

const INITIAL_CITY = 'Paris';

type State = {
  city: string;
  offers: Offer[];
  aroundOffers: Offer[];
  sortOffers: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  user: string;
  offer: ExtendedOffer | undefined;
  reviews: Review[];
  comment: string;
  rating: number;
  activeOfferId: string;
  isSubmittingReview: boolean;
};

const initialState: State = {
  city: INITIAL_CITY,
  offers: [],
  sortOffers: Sorts.POPULAR,
  isFiltersOpen: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  user:'',
  offer: undefined,
  reviews: [],
  aroundOffers: [],
  comment: '',
  activeOfferId: '',
  rating: 0,
  isSubmittingReview: false
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
    })
    .addCase(setEmail, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadAroundOffers, (state, action) => {
      state.aroundOffers = action.payload;
    })
    .addCase(setComment, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(hoverOffer, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(setRating, (state, action) => {
      state.rating = action.payload;
    })
    .addCase(submitReviewAction, (state, action) => {
      state.isSubmittingReview = action.payload;
    });
});
