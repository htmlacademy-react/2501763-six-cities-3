import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Main from './main';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import CardsList from '../../components/cards-list/cards-list';
import Sort from '../../components/sort/sort';
import { makeFakeStore, makeFakeOfferCard } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constants';

describe('Component: Main', () => {
  it('should render correctly', () => {
    vi.mock('../../components/header/header');
    vi.mock('../../components/cities-list/cities-list');
    vi.mock('../../components/cards-list/cards-list');
    vi.mock('../../components/sort/sort');
    const fakeOffer = makeFakeOfferCard();

    const { withStoreComponent } = withStore(<Main />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      },
      offers: {
        offers: [fakeOffer],
        isOffersLoading: false,
        offerCard: undefined,
        offer: undefined,
        aroundOffers: [],
        favoriteOffers: [],
        isOfferLoading: false,
        isFavoriteLoading: false,
        favoriteStatus: false,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const expectedText = `${[fakeOffer].length} place to stay in ${fakeOffer.city.name}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(Header).toBeCalled();
    expect(CitiesList).toBeCalled();
    expect(CardsList).toBeCalled();
    expect(Sort).toBeCalled();
  });
  it('should render correctly with offers.length=0', () => {
    const expectedText = 'No places to stay available';

    const { withStoreComponent } = withStore(<Main />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      },
      offers: {
        offers: [],
        isOffersLoading: false,
        offerCard: undefined,
        offer: undefined,
        aroundOffers: [],
        favoriteOffers: [],
        isOfferLoading: false,
        isFavoriteLoading: false,
        favoriteStatus: false,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
