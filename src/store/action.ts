import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constants';

export const Action = {
  REDIRECT: 'REDIRECT'
};

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);
