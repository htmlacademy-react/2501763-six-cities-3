import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mock-component';
import Offer from './offer';
import {makeFakeStore, makeFakeOfferPage, makeFakeOfferCard, extractActionsTypes} from '../../utils/mocks';
import {AuthorizationStatus, APIRoute} from '../../constants';
import ReviewList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
import {postFavoriteAction, fetchFavoriteOffersAction, fetchOffersAction} from '../../store/api-actions';
import {loadOffer, loading} from '../../store/offers-load/offers-load';
import {redirectToRoute} from '../../store/action';
import { INITIAL_SORT } from '../../constants';

describe('Component: Offer', () => {

  it('should render correct with Auth', () => {
    vi.mock('../../components/review-list/review-list');
    vi.mock('../../components/review-form/review-form');
    const fakeOffer = makeFakeOfferPage();
    const fakeOfferCard = makeFakeOfferCard();
    const placeCardId = 'placeCard';

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [fakeOfferCard],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getAllByAltText(`Photo ${fakeOffer.type}`).length).toBe(fakeOffer.images.length);
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.host.name)).toBeInTheDocument();
    expect(ReviewList).toBeCalled();
    expect(ReviewForm).toBeCalled();
    expect(screen.getByText('Other places in the neighbourhood'));
    expect(screen.getAllByTestId(placeCardId).length).toBe([fakeOfferCard].length);
    screen.debug();
  });

  it('should render correct with NoAuth', () => {
    vi.mock('../../components/review-list/review-list');
    const fakeOffer = makeFakeOfferPage();
    const fakeOfferCard = makeFakeOfferCard();
    const placeCardId = 'placeCard';

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [fakeOfferCard],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getAllByAltText(`Photo ${fakeOffer.type}`).length).toBe(fakeOffer.images.length);
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i));
    expect(screen.getByText(fakeOffer.host.name));
    expect(screen.getByText('Other places in the neighbourhood'));
    expect(screen.getAllByTestId(placeCardId).length).toBe([fakeOfferCard].length);
    expect(screen.queryByLabelText('Your review')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Tell how was your stay, what you like and what can be improved')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    expect(ReviewList).toBeCalled();
  });

  it('should render correct with isOfferLoading=true', () => {

    const fakeOffer = makeFakeOfferPage();
    const fakeOfferCard = makeFakeOfferCard();

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: true,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [fakeOfferCard],
      favoriteOffers: [],
      isOfferLoading: true,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

  });

  it('should dispatch postFavoriteAction', async () => {
    const fakeOffer = makeFakeOfferPage();
    const bookmarkButtonId = 'bookmark-button';

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer.id}/${!fakeOffer.isFavorite ? 1 : 0}`).reply(201);
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);


    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId(bookmarkButtonId));
    const actions = extractActionsTypes(mockStore.getActions());


    expect(actions).toEqual([
      postFavoriteAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      postFavoriteAction.fulfilled.type,
      fetchOffersAction.pending.type,
      loading.type,
      loadOffer.type,
      fetchFavoriteOffersAction.fulfilled.type,
      fetchOffersAction.fulfilled.type
    ]);
  });
  it('should dispatch RedirectAction with NoAth', async () => {
    const fakeOffer = makeFakeOfferPage();
    const bookmarkButtonId = 'bookmark-button';

    const { withStoreComponent, mockStore } = withStore(<Offer/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
      isLoginFormDisabled: false,
      email: ''
    },
    DATA_OFFERS: {
      offers: [],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: false,
      offerCard: undefined,
      offer: fakeOffer,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false,
    } }));


    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId(bookmarkButtonId));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      redirectToRoute.type
    ]);
  });
});
