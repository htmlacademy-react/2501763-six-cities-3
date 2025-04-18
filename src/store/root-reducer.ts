import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { appActions } from './app-actions/app-actions';
import { reviewsLoad } from './reviews-load/reviews-load';
import { userAuthorization } from './user-authorization/user-authorization';
import { offersLoad } from './offers-load/offers-load';

export const rootReducer = combineReducers({
  [NameSpace.OffersData]: offersLoad.reducer,
  [NameSpace.AppActions]: appActions.reducer,
  [NameSpace.User]: userAuthorization.reducer,
  [NameSpace.ReviewsData]: reviewsLoad.reducer,
});
