import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {fetchOffersAction, fetchAroundOffersAction, fetchOfferPageAction} from '../api-actions';
import {loadOffer} from '../action';
import {OffersLoad} from '../../types/state';

const initialState: OffersLoad = {
  offers: [],
  isOffersLoading: false,
  offer: undefined,
  aroundOffers: [],
};

export const offersLoad = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchAroundOffersAction.fulfilled, (state, action) => {
        state.aroundOffers = action.payload;
      })
      .addCase(fetchOfferPageAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOfferPageAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferPageAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(loadOffer, (state, action) => {
        state.offer = action.payload;
      });
  }
});
