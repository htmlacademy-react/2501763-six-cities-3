import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { AppActions } from '../../types/state';

const initialState: AppActions = {
  activeOfferId: '',
  error: null,
};

export const appActions = createSlice({
  name: NameSpace.AppActions,
  initialState,
  reducers: {
    hoverOffer: (state, action: PayloadAction<string>) => {
      state.activeOfferId = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { hoverOffer, setError } = appActions.actions;
