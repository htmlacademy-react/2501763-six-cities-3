import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {toggleSortsMenu, resetSort, hoverOffer, selectCity, setError} from '../action';
import {AppActions} from '../../types/state';
import {Sorts} from '../../components/sort/const';

const INITIAL_CITY = 'Paris';
const INITIAL_SORT = 'Popular';

const initialState: AppActions = {
  sortOffers: INITIAL_SORT,
  isFiltersOpen: false,
  activeOfferId: '',
  error: null,
  city: INITIAL_CITY,
};

export const appActions = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(toggleSortsMenu, (state) => {
        state.isFiltersOpen = !state.isFiltersOpen;
      })
      .addCase(resetSort, (state) => {
        state.sortOffers = Sorts.POPULAR;
      })
      .addCase(hoverOffer, (state, action) => {
        state.activeOfferId = action.payload;
      })
      .addCase(selectCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
