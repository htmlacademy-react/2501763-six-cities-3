import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { fetchOffersAction, fetchAroundOffersAction, fetchOfferPageAction, fetchFavoriteOffersAction } from '../api-actions';
import { OffersLoad } from '../../types/state';
import { Sorts } from '../../components/sort/const';
import { sortOffers } from '../../components/sort/utils';
import { INITIAL_SORT } from '../../constants';

const initialState: OffersLoad = {
  offers: [],
  sortOffers: INITIAL_SORT,
  isFiltersOpen: false,
  isOffersLoading: false,
  offer: undefined,
  offerCard: undefined,
  aroundOffers: [],
  favoriteOffers: [],
  isOfferLoading: false,
  isFavoriteLoading: false,
  favoriteStatus: false
};

export const offersLoad = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    loadOffer: (state, action: PayloadAction<OffersLoad['favoriteStatus']>) => {
      if (state.offer) {
        state.offer.isFavorite = action.payload;
      }
    },
    refreshCards: (state, action: PayloadAction<OffersLoad['offerCard']>) => {
      if (state.aroundOffers) {
        state.aroundOffers.forEach((item)=>{
          if (action.payload && item.id === action.payload.id){
            item.isFavorite = !action.payload.isFavorite;
          }
        });
      }
      state.offers.forEach((item) => {
        if (action.payload && item.id === action.payload.id) {
          item.isFavorite = !action.payload.isFavorite;
        }
      });
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = !action.payload;
    },
    refreshFavoriteCards: (state, action: PayloadAction<OffersLoad['offerCard']>) => {
      state.favoriteOffers.forEach((item) => {
        if (action.payload && item.id === action.payload.id) {
          item.isFavorite = !action.payload.isFavorite;
        }
      });
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sortOffers = action.payload;
      state.offers = sortOffers[action.payload]([...state.offers]);
    },
    resetSort: (state) => {
      state.sortOffers = Sorts.POPULAR;
    },
    toggleSortsMenu: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchAroundOffersAction.fulfilled, (state, action) => {
        state.aroundOffers = action.payload;
      })
      .addCase(fetchOfferPageAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferPageAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferPageAction.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isOfferLoading = false;
      });
  }
});

export const { loadOffer, refreshCards, changeSort, resetSort, toggleSortsMenu, loading, refreshFavoriteCards } = offersLoad.actions;
