import {createAction} from '@reduxjs/toolkit';
import {ExtendedOffer} from '../types/offer';
//import {Review} from '../types/review';
import {AppRoute} from '../constants';

export const Action = {
  SELECT_CITY: 'SELECT_CITY',
  //LOAD_OFFERS: 'LOAD_OFFERS',
  LOAD_OFFER: 'LOAD_OFFER',
  //LOAD_NEAR_OFFERS: 'LOAD_NEAR_OFFERS',
  //LOAD_REVIEWS: 'LOAD_REVIEWS',
  SET_ERROR: 'SET_ERROR',
  REDIRECT: 'REDIRECT',
  //LOGIN: 'LOGIN',
  ACTIVE_OFFER: 'ACTIVE_OFFER',
  //SET_REVIEW: 'SET_REVIEW',
  //SET_RATING: 'SET_RATING',
  //SUBMIT_REVIEW: 'SUBMIT_REVIEW'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

//export const loadOffers = createAction<Offer[]>('LOAD_OFFERS');
export const loadOffer = createAction<ExtendedOffer|undefined>(Action.LOAD_OFFER);
//export const loadReviews = createAction<Review[]>(Action.LOAD_REVIEWS);
//export const loadAroundOffers = createAction<Offer[]>(Action.LOAD_NEAR_OFFERS);

export const changeSort = createAction<string>('CHANGE_SORT');

export const toggleSortsMenu = createAction('TOGGLE_SORTS_MENU');

export const resetSort = createAction('RESET_SORT');

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));

//export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');

//export const setOffersDataLoadingStatus = createAction<boolean>('SET_QUESTIONS_DATA_LOADING_STATUS');

export const setError = createAction<string | null>(Action.SET_ERROR);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);

//export const setEmail = createAction(Action.LOGIN, (value:string)=>({
// payload:value
//}));

//export const setComment = createAction(Action.SET_REVIEW, (value:string)=>({
// payload:value
//}));

//export const setRating = createAction(Action.SET_RATING, (value:number)=>({
//  payload:value
//}));

//export const submitReviewAction = createAction<boolean>(Action.SUBMIT_REVIEW);
