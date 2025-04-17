import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { makeFakeOfferCard } from '../../utils/moks';


describe('Component: FavoritePlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();

    const placeCardValueTestId = 'placeCard';

    const { withStoreComponent } = withStore(<PlaceCard offer={fakeOffer} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const placeCardValues = screen.getAllByTestId(placeCardValueTestId);

    expect(placeCardValues).toBeDefined();
  });
});
