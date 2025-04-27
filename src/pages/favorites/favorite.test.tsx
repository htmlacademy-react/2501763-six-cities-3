import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Favorite from './favorites';
import { AuthorizationStatus } from '../../constants';
import { makeFakeStore, makeFakeOfferCard } from '../../utils/mocks';

describe('Component: Favorite', () => {
  it('should render correctly', () => {
    const LOGOS_COUNT = 2;
    const fakeOffer = makeFakeOfferCard();
    const favoriteCardId = 'favorite-card';
    const favoriteCityId = 'city-favorite';

    const fakeAllFavoriteCities: string[] = [];
    [fakeOffer].forEach((item) => {
      fakeAllFavoriteCities.push(item.city.name);
    });
    const fakeFavoriteCities = [... new Set(fakeAllFavoriteCities)];

    const { withStoreComponent } = withStore(<Favorite />, makeFakeStore({
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
        favoriteOffers: [fakeOffer],
        isOfferLoading: false,
        isFavoriteLoading: false,
        favoriteStatus: false,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const favoriteCards = screen.getAllByTestId(favoriteCardId);
    const favoriteCities = screen.getAllByTestId(favoriteCityId);

    expect(favoriteCities.length).toBe(fakeFavoriteCities.length);
    expect(favoriteCards.length).toBe([fakeOffer].length);
    expect(screen.getAllByAltText('6 cities logo').length).toBe(LOGOS_COUNT);
  });

  it('should render correctly with isFavoriteLoading=true', () => {
    const expextedText = /Loading/i;

    const { withStoreComponent } = withStore(<Favorite />, makeFakeStore({
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
        isFavoriteLoading: true,
        favoriteStatus: false,
      }
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expextedText)).toBeInTheDocument();

  });
});
