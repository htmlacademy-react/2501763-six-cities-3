import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {fetchReviewsAction} from '../api-actions';
import {ReviewsLoad} from '../../types/state';

const initialState: ReviewsLoad = {
  reviews: [],
};

export const reviewsLoad = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
