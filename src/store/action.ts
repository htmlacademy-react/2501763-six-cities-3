import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AuthorizationStatus, AppRoute} from '../constants';


export const Action = {
  SELECT_CITY:'SELECT_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS',
  SET_ERROR:'offers/SET_ERROR',
  REDIRECT:'login/redirectToRoute',
  LOGIN: 'user/login'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<Offer[]>('LOAD_OFFERS');

export const changeSort = createAction<string>('CHANGE_SORT');

export const toggleSortsMenu = createAction('TOGGLE_SORTS_MENU');

export const resetSort = createAction('RESET_SORT');

export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');

export const setOffersDataLoadingStatus = createAction<boolean>('SET_QUESTIONS_DATA_LOADING_STATUS');

export const setError = createAction<string | null>(Action.SET_ERROR);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);

export const login = createAction(Action.LOGIN, (value:string)=>({payload:value}));
