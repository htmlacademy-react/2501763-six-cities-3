import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppActions } from '../../types/state';

const INITIAL_CITY = 'Paris';

const initialState: AppActions = {
  activeOfferId: '',
  error: null,
  city: INITIAL_CITY,
};

export const appActions = createSlice({
  name: NameSpace.AppActions,
  initialState,
  reducers: {
    hoverOffer: (state, action: PayloadAction<string>) => {
      state.activeOfferId = action.payload;
    },
    selectCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { selectCity, hoverOffer, setError } = appActions.actions;
