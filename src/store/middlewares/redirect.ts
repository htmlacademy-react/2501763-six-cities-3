import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../components/browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { Action } from '../action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === Action.REDIRECT) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
