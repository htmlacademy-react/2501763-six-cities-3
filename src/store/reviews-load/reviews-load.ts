import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { ReviewsLoad } from '../../types/state';

const initialState: ReviewsLoad = {
  reviews: [],
  isReviewFormDisabled: false
};

export const reviewsLoad = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewFormDisabled = false;
        state.reviews = action.payload.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,10);
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewFormDisabled = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewFormDisabled = true;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewFormDisabled = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewFormDisabled = false;
      });
  }
});
