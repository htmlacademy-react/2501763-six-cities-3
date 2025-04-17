import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../constants';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOfferCard } from '../../utils/moks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "Main" when user navigate to "/"', () => {
    const mainContainerTestId = 'main-page';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    expect(mainContainerTestId).toBeDefined();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);
    expect(screen.queryAllByText(/Sign in/i)).toBeDefined();

  });
  it('should render "Favorite" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
        email: ''
      }
    }));
    const favoriteContainerTestId = 'favorite-page';
    mockHistory.push(AppRoute.Favorites);
    render(withStoreComponent);

    expect(favoriteContainerTestId).toBeDefined();
  });
  it('should render "Offer" when user navigate to "/offers/{offerId}"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const fakeOffer = makeFakeOfferCard();
    mockHistory.push(`${AppRoute.Offer}/${fakeOffer.id}`);
    const offerContainerTestId = 'offer-page';
    render(withStoreComponent);

    expect(offerContainerTestId).toBeDefined();
  });
  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    render(withStoreComponent);
    expect(screen.getByText('Page is not Found')).toBeInTheDocument();
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });
});
