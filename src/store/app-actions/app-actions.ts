import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppActions } from '../../types/state';
import { INITIAL_SORT } from '../../constants';

const initialState: AppActions = {
  sort: INITIAL_SORT,
  activeOfferId: '',
  error: null,
};

export const appActions = createSlice({
  name: NameSpace.AppActions,
  initialState,
  reducers: {
    sortOffers: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    hoverOffer: (state, action: PayloadAction<string>) => {
      state.activeOfferId = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { sortOffers, hoverOffer, setError } = appActions.actions;
