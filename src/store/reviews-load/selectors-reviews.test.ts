import { NameSpace } from '../../constants';
import { getReviews, getDisabledReviewStatus } from './selectors';

describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.ReviewsData]: {
      reviews: [],
      isReviewFormDisabled: false
    }
  };
  it('should return reviews', () => {
    const { reviews } = state[NameSpace.ReviewsData];
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return isReviewFormDisabled status', () => {
    const { isReviewFormDisabled } = state[NameSpace.ReviewsData];
    const result = getDisabledReviewStatus(state);
    expect(result).toBe(isReviewFormDisabled);
  });
});
