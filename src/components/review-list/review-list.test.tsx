import { render } from '@testing-library/react';

import { makeFakeReview } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewList from './review-list';
import ReviewItem from '../review/review';

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const fakeReviews = [makeFakeReview()];
    vi.mock('../review/review');

    const { withStoreComponent } = withStore(<ReviewList reviews={fakeReviews} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(ReviewItem).toBeCalled();
  });
});
