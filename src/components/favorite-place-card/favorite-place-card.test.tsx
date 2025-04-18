import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoritePlaceCard from './favorite-place-card';
import { makeFakeOfferCard } from '../../utils/moks';


describe('Component: FavoritePlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();

    const favoriteCardValueTestId = 'favorite-card';

    const { withStoreComponent } = withStore(<FavoritePlaceCard offer={fakeOffer} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const favoriteCardValues = screen.getAllByTestId(favoriteCardValueTestId);

    expect(favoriteCardValues).toBeDefined();
  });
});
