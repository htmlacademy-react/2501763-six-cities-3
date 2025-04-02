import {createAction} from '@reduxjs/toolkit';
import {Offer, OfferPage} from '../types/offer';
import {Review} from '../types/review';
import {AuthorizationStatus, AppRoute} from '../constants';


export const Action = {
  SELECT_CITY:'SELECT_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS',
  LOAD_OFFER: 'offer/LOAD_OFFER',
  LOAD_AROUND_OFFERS: 'aroundOffer/LOAD_AROUND_OFFERS',
  LOAD_REVIEWS: 'reviews/LOAD_REVIEWS',
  SET_ERROR:'offers/SET_ERROR',
  REDIRECT:'login/redirectToRoute',
  LOGIN: 'user/login',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER',
  SET_REVIEW: 'offer/review',
  SET_RATING: 'offer/rating'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<Offer[]>('LOAD_OFFERS');
export const loadOffer = createAction<OfferPage|undefined>(Action.LOAD_OFFER);
export const loadReviews = createAction<Review[]>(Action.LOAD_REVIEWS);
export const loadAroundOffers = createAction<Offer[]>(Action.LOAD_AROUND_OFFERS);

export const changeSort = createAction<string>('CHANGE_SORT');

export const toggleSortsMenu = createAction('TOGGLE_SORTS_MENU');

export const resetSort = createAction('RESET_SORT');

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));

export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');

export const setOffersDataLoadingStatus = createAction<boolean>('SET_QUESTIONS_DATA_LOADING_STATUS');

export const setError = createAction<string | null>(Action.SET_ERROR);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);

export const setEmail = createAction(Action.LOGIN, (value:string)=>({
  payload:value
}));

export const setComment = createAction(Action.SET_REVIEW, (value:string)=>({
  payload:value
}));

export const setRating = createAction(Action.SET_RATING, (value:number)=>({
  payload:value
}));
