import { render } from '@testing-library/react';
import { makeFakeOfferCard } from '../../utils/moks';
import { withHistory, withStore } from '../../utils/mock-component';
import CardsList from './cards-list';
import PlaceCard from '../place-card/place-card';

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const fakeOffers = [makeFakeOfferCard()];
    vi.mock('../place-card/place-card');

    const { withStoreComponent } = withStore(<CardsList offers={fakeOffers} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(PlaceCard).toBeCalled();
  });
});
