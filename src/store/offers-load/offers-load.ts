import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {fetchOffersAction, fetchAroundOffersAction, fetchOfferPageAction, fetchFavoriteOffersAction} from '../api-actions';
import {OffersLoad} from '../../types/state';
import {Sorts} from '../../components/sort/const';
import {sortOffers} from '../../components/sort/utils';

const INITIAL_SORT = 'Popular';

const initialState: OffersLoad = {
  offers: [],
  sortOffers: INITIAL_SORT,
  isFiltersOpen: false,
  isOffersLoading: false,
  offer: undefined,
  aroundOffers: [],
  favoriteOffers: []
};

export const offersLoad = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    loadOffer:(state, action: PayloadAction<OffersLoad['offer']>) => {
      state.offer = action.payload;
    },
    refreshCards:(state, action: PayloadAction<OffersLoad['offer']>)=>{
      state.offers.map((item)=>{
        if(action.payload && item.id === action.payload.id){
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
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  }
});

export const {loadOffer, refreshCards, changeSort, resetSort, toggleSortsMenu} = offersLoad.actions;
