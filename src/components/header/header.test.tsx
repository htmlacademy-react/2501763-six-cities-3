import { render, screen } from '@testing-library/react';
import { Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import Header from './header';
import { makeFakeUser, makeFakeOfferCard, makeFakeStore } from '../../utils/mocks.js';
import { AuthorizationStatus, AppRoute, APIRoute } from '../../constants';
import { extractActionsTypes } from '../../utils/mocks.js';
import { logoutAction, fetchOffersAction } from '../../store/api-actions';
import { loading } from '../../store/offers-load/offers-load.js';

describe('Component: Header', () => {
  it('should render correct with Auth', () => {
    const fakeOffer = makeFakeOfferCard();
    const fakeUser = makeFakeUser();
    const fakeFavorites = [];
    [fakeOffer].forEach((item) => {
      if (item.isFavorite === true) {
        fakeFavorites.push(item);
      }
    });

    const withHistoryComponent = withHistory(<Header />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
        isLoginFormDisabled: false,
      }, offers: {
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
    })
    );

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    expect(screen.getAllByRole('link'));
    expect(screen.getByText('Sign out'));
    expect(screen.getByText(fakeUser.email));
    expect(screen.getByAltText('6 cities logo'));
    expect(screen.getByText(fakeFavorites.length));
  });

  it('should render correct with NoAuth', () => {

    const withHistoryComponent = withHistory(<Header />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    const preparedComponent = withStoreComponent;
    render(preparedComponent);

    expect(screen.getAllByRole('link'));
    expect(screen.getByText('Sign in'));
    expect(screen.getByAltText('6 cities logo'));
  });

  it('should called handle', async () => {
    const mockHandleClick = vi.fn();
    render(
      withHistory(
        <li className="header__nav-item">
          <Link
            onClick={mockHandleClick}
            className="header__nav-link" to={AppRoute.Main}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      )
    );

    await userEvent.click(screen.getByRole('link'));
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('should dispatch logoutAction', async () => {
    const logoutLinkId = 'logout-link';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistory(<Header />), makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204, []);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);
    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(logoutLinkId));
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      logoutAction.pending.type,
      fetchOffersAction.pending.type,
      loading.type,
      logoutAction.fulfilled.type,
      fetchOffersAction.fulfilled.type,
    ]);

  });
});
