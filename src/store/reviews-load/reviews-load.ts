import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {fetchReviewsAction, postReviewAction} from '../api-actions';
import {ReviewsLoad} from '../../types/state';

const initialState: ReviewsLoad = {
  reviews: [],
  isReviewFormDasabled: false
};

export const reviewsLoad = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewFormDasabled = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewFormDasabled = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewFormDasabled = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewFormDasabled = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewFormDasabled = false;
      });
  }
});
