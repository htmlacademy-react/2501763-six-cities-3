import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeOfferCard, makeFakeOfferPage, makeFakeReview } from '../utils/moks';
import { State } from '../types/state';
import { checkAuthAction, loginAction, logoutAction, fetchOffersAction, fetchAroundOffersAction, fetchOfferPageAction, fetchFavoriteOffersAction, postFavoriteAction, fetchReviewsAction, postReviewAction } from './api-actions';
import { loading } from '../store/offers-load/offers-load';
import { APIRoute } from '../constants';
import { redirectToRoute } from './action';
import { NewComment } from '../types/review';
import { AuthData } from '../types/auth-type';
import { FavoriteOffer } from '../types/offer';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA_OFFERS: { offers: [], isFavoriteLoading: false } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });
  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOfferCard()];
      const isFavoriteChangeMock = false;

      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);
      await store.dispatch(fetchOffersAction(isFavoriteChangeMock));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchOffersActionFulfilled = emittedActions.at(-1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        loading.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      const isFavoriteChangeMock = false;
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction(isFavoriteChangeMock));

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        loading.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchAroundOffersAction', () => {
    it('should dispatch "fetchAroundOffersAction.pending", "fetchAroundOffersAction.fulfilled", when server response 200', async () => {
      const mockAroundOffers = [makeFakeOfferCard()];
      const offerMock = makeFakeOfferPage();

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMock.id}/nearby`).reply(200, mockAroundOffers);

      await store.dispatch(fetchAroundOffersAction(offerMock.id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchAroundOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchAroundOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchAroundOffersAction.pending.type,
        fetchAroundOffersAction.fulfilled.type,
      ]);
      expect(fetchAroundOffersActionFulfilled.payload)
        .toEqual(mockAroundOffers);
    });
    it('should dispatch "fetchAroundOffersAction.pending", "fetchAroundOffersAction.rejected" when server response 400', async () => {
      const offerMock = makeFakeOfferPage();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMock.id}/nearby`).reply(400, []);
      await store.dispatch(fetchAroundOffersAction(offerMock.id));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchAroundOffersAction.pending.type,
        fetchAroundOffersAction.rejected.type,
      ]);
    });
  });


  describe('fetchOfferPageAction', () => {
    it('should dispatch "fetchOfferPageAction.pending", "fetchOfferPageAction.fulfilled", when server response 200', async () => {
      const offerMock = makeFakeOfferPage();

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMock.id}`).reply(200, offerMock);

      await store.dispatch(fetchOfferPageAction(offerMock.id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferPageActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferPageAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferPageAction.pending.type,
        fetchOfferPageAction.fulfilled.type,
      ]);
      expect(fetchOfferPageActionFulfilled.payload)
        .toEqual(offerMock);
    });
    it('should dispatch "fetchOfferPageAction.pending", "fetchOfferPageAction.rejected" when server response 400', async () => {
      const offerMock = makeFakeOfferPage();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMock.id}/nearby`).reply(400, []);
      await store.dispatch(fetchOfferPageAction(offerMock.id));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOfferPageAction.pending.type,
        redirectToRoute.type,
        fetchOfferPageAction.fulfilled.type,
      ]);
    });
  });


  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOfferCard()];

      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);
      expect(fetchFavoriteOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteOffersAction());

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });


  describe('postFavoriteAction', () => {
    it('should dispatch "postFavoriteAction.pending", "postFavoriteAction.fulfilled" when server response 200', async () => {
      const fakeFavoriteOffer: FavoriteOffer = {
        offerId: 'ghghytyty',
        status: 1
      };
      const fakeServerReplay = { token: 'secret' };

      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeFavoriteOffer.offerId}/${fakeFavoriteOffer.status}`).reply(200, fakeServerReplay);

      await store.dispatch(postFavoriteAction(fakeFavoriteOffer));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postFavoriteAction.pending.type,
        fetchFavoriteOffersAction.pending.type,
        postFavoriteAction.fulfilled.type,
      ]);
    });
  });


  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      const mockReviews = [makeFakeReview()];
      const offerIdMock = 'qwertt765ert';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerIdMock}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(offerIdMock));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      const offerIdMock = 'qwertt765ert';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerIdMock}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(offerIdMock));

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled" when server response 200', async () => {

      const fakeNewCommet: NewComment = {
        pageId: 'ghghytyty',
        comment: 'should dispatch "postReviewAction.pending",',
        rating: 5,
        formRef: null
      };
      const fakeServerReplay = { token: 'secret' };

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${fakeNewCommet.pageId}`).reply(200, fakeServerReplay);

      await store.dispatch(postReviewAction(fakeNewCommet));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        fetchReviewsAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        checkAuthAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });
    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        logoutAction.pending.type,
        fetchOffersAction.pending.type,
        loading.type,
        logoutAction.fulfilled.type,
      ]);
    });
    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      await store.dispatch(logoutAction());
      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
