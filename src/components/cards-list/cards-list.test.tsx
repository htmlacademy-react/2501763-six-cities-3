import { render, screen } from '@testing-library/react';
import { makeFakeOfferCard, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import CardsList from './cards-list';
import {AuthorizationStatus} from '../../constants';

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const fakeOffers = [makeFakeOfferCard()];
    const cardValueTestId = 'placeCard';
    const { withStoreComponent } = withStore(<CardsList offers={fakeOffers}/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    } }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const cardsValues = screen.getAllByTestId(cardValueTestId);
    expect(cardsValues.length).toBe(fakeOffers.length);
  });
});
