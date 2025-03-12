import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';

const Action = {
  SELECT_CITY:'SELECT_CITY',
  LOAD_OFFERS: 'LOAD_OFFERS'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<{offers:Offers}>(Action.LOAD_OFFERS);
