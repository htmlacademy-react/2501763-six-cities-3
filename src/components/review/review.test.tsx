import { render, screen } from '@testing-library/react';
import ReviewItem from './review';
import { makeFakeReview } from '../../utils/moks';


describe('Component: ReviewItem', () => {
  it('should render correct', () => {
    const fakeReview = makeFakeReview();
    const reviewContainerTestId = 'review-item';


    render(<ReviewItem review={fakeReview} />);
    const reviewContainer = screen.getByTestId(reviewContainerTestId);


    expect(reviewContainer).toBeInTheDocument();
  });
});
