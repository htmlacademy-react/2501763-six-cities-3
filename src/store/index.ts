import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer/reduser';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect),
});
