import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoritePlaceCard from './favorite-place-card';
import { makeFakeStore, makeFakeOfferCard, extractActionsTypes } from '../../utils/mocks';
import { AuthorizationStatus, APIRoute } from '../../constants';
import { postFavoriteAction, fetchOffersAction } from '../../store/api-actions';
import { loading } from '../../store/offers-load/offers-load';

describe('Component: FavoritePlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();
    const bookmarkButtonTextTestId = 'bookmark';

    const { withStoreComponent } = withStore(<FavoritePlaceCard offer={fakeOffer} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    if (fakeOffer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }

    const bookmarkSpan = screen.getByTestId(bookmarkButtonTextTestId);

    expect(screen.getByAltText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(bookmarkSpan);
  });

  it('should dispatch postFavoriteAction', async () => {
    const fakeOffer = makeFakeOfferCard();
    const fakeServerReplay = { token: 'secret' };

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<FavoritePlaceCard offer={fakeOffer} />, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        isLoginFormDisabled: false,
      }
    }));

    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer.id}/${!fakeOffer.isFavorite ? 1 : 0}`).reply(200, fakeServerReplay);
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postFavoriteAction.pending.type,
      postFavoriteAction.fulfilled.type,
      fetchOffersAction.pending.type,
      loading.type,
      fetchOffersAction.fulfilled.type
    ]);
  });
});
