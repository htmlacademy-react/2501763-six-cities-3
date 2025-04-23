import { NameSpace } from '../../constants';
import { getSortedReviews, getDisabledReviewStatus } from './selectors';
import { makeFakeReview } from '../../utils/mocks';

describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.ReviewsData]: {
      reviews: [makeFakeReview()],
      isReviewFormDasabled: false,
    }
  };
  it('should return reviews', () => {
    const { reviews } = state[NameSpace.ReviewsData];
    const result = getSortedReviews(state);
    expect(result).toBe(reviews);
  });

  it('should return isReviewFormDisabled status', () => {
    const { isReviewFormDisabled } = state[NameSpace.ReviewsData];
    const result = getDisabledReviewStatus(state);
    expect(result).toBe(isReviewFormDisabled);
  });
});
