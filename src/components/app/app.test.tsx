import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthorizationStatus, AppRoute } from '../../constants';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import {makeFakeStore, makeFakeOfferPage, makeFakeReview} from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo'));
  });


  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
    expect(screen.getByAltText('6 cities logo'));
  });
  it('should render "Favorite" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);
    expect(screen.getAllByAltText('6 cities logo'));
    expect(screen.getByText('Sign out'));
    expect(screen.getByText('Nothing yet saved.'));
  });
  it('should render "Offer" when user navigate to "/offers/{offerId}"', () => {
    const fakeOfferPage = makeFakeOfferPage();
    const fakeReview = makeFakeReview();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }, offers: {
        offers: [],
        isOffersLoading: false,
        offerCard: undefined,
        offer: fakeOfferPage,
        aroundOffers: [],
        favoriteOffers: [],
        isOfferLoading: false,
        isFavoriteLoading: false,
        favoriteStatus: false,
      },
      reviews: {
        reviews: [fakeReview],
        isReviewFormDisabled: false
      },
    }));
    mockHistory.push(`${AppRoute.Offer}/${fakeOfferPage.id}`);
    render(withStoreComponent);
    expect(screen.getByText(`${fakeOfferPage.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakeOfferPage.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(fakeOfferPage.title)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();

  });
  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    render(withStoreComponent);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
