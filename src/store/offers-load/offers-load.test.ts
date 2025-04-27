import { makeFakeOfferCard, makeFakeOfferPage } from '../../utils/mocks';
import { fetchOffersAction, fetchAroundOffersAction, fetchOfferPageAction, fetchFavoriteOffersAction } from '../api-actions';
import { offersLoad, loadOffer, refreshCards, loading } from './offers-load';

describe('OffersLoad Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "isOffersLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOfferCard = makeFakeOfferCard();
    const expectedState = {
      offers: [mockOfferCard],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        [mockOfferCard], '', true)
    );
    expect(result).toEqual(expectedState);
  });
  it('should set "isOffersLoading" to "false" with "fetchOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchOffersAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferPageLoading" to "true" with "fetchOfferPageAction.pending"', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: true,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(undefined, fetchOfferPageAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to offer, "isOfferPageLoading" to "false" with "fetchOfferPageAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferPage();
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: mockOffer,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchOfferPageAction.fulfilled(
        mockOffer, mockOffer.id, '')
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferPageLoading" to "false" with "fetchOfferPageAction.rejected"', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchOfferPageAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "aroundOffers" to array with offer with "fetchAroundOffersAction.fulfilled"', () => {
    const mockOfferCard = makeFakeOfferCard();
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [mockOfferCard],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchAroundOffersAction.fulfilled(
        [mockOfferCard], '', '')
    );
    expect(result).toEqual(expectedState);
  });


  it('should set "isFavoriteLoading" to "true" with "fetchFavoriteOffersAction.pending"', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: true,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(undefined, fetchFavoriteOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffers" to array with offer, "isFavoriteLoading" to "false" with "fetchFavoriteOffersAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferCard();
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [mockOffer],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchFavoriteOffersAction.fulfilled(
        [mockOffer], '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteLoading" to "false" with "fetchFavoriteOffersAction.rejected"', () => {
    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(
      undefined,
      fetchOfferPageAction.rejected
    );
    expect(result).toEqual(expectedState);
  });

  it('should return actual favorite status for offer', () => {
    const mockOffer = makeFakeOfferPage();
    const actualFavoriteStatus = false;

    const initialState = {
      offers: [],
      isOffersLoading: false,
      offer: mockOffer,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };

    const expectedState = {
      offers: [],
      isOffersLoading: false,
      offer: { ...mockOffer, isFavorite: actualFavoriteStatus },
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(initialState, loadOffer(actualFavoriteStatus));
    expect(result).toEqual(expectedState);
  });

  it('should return state with actual favorite status for offerCard', () => {
    const offerMock = makeFakeOfferCard();

    const initialState = {
      offers: [offerMock],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };

    const expectedState = {
      offers: [{ ...offerMock, isFavorite: !offerMock.isFavorite }],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(initialState, refreshCards(offerMock));
    expect(result).toEqual(expectedState);
  });

  it('should return state with actual isOffersLoading', () => {
    const actualOffersLoading = false;

    const initialState = {
      offers: [],
      isOffersLoading: false,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };

    const expectedState = {
      offers: [],
      isOffersLoading: !actualOffersLoading,
      offer: undefined,
      offerCard: undefined,
      aroundOffers: [],
      favoriteOffers: [],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    };
    const result = offersLoad.reducer(initialState, loading(actualOffersLoading));
    expect(result).toEqual(expectedState);
  });
});
