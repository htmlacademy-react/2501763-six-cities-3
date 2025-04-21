import { NameSpace } from '../../constants';
import { getAroundOffers, getOffersLoadingStatus, getOfferPageLoadingStatus, getFavoriteLoadingStatus, getDataOffer, getDataCard, getOffers, getFavoriteOffers, getFavoritesLength } from './selectors';
import { INITIAL_SORT } from '../../constants';
import {makeFakeOfferCard, makeFakeFavoriteOfferCard, makeFakeOfferPage} from '../../utils/mocks';

describe('OffersData selectors', () => {
  const state = {
    [NameSpace.OffersData]: {
      offers: [makeFakeOfferCard(), makeFakeFavoriteOfferCard()],
      sortOffers: INITIAL_SORT,
      isFiltersOpen: false,
      isOffersLoading: false,
      offer: makeFakeOfferPage(),
      offerCard: makeFakeOfferCard(),
      aroundOffers: [makeFakeOfferCard()],
      favoriteOffers: [makeFakeFavoriteOfferCard()],
      isOfferLoading: false,
      isFavoriteLoading: false,
      favoriteStatus: false
    }
  };
  it('should return aroundOffers', () => {
    const { aroundOffers } = state[NameSpace.OffersData];
    const result = getAroundOffers(state);
    expect(result).toBe(aroundOffers);
  });

  it('should return isOffersLoading status', () => {
    const { isOffersLoading } = state[NameSpace.OffersData];
    const result = getOffersLoadingStatus(state);
    expect(result).toBe(isOffersLoading);
  });

  it('should return isOfferLoading status', () => {
    const { isOfferLoading } = state[NameSpace.OffersData];
    const result = getOfferPageLoadingStatus(state);
    expect(result).toBe(isOfferLoading);
  });

  it('should return isFavoriteLoading status', () => {
    const { isFavoriteLoading } = state[NameSpace.OffersData];
    const result = getFavoriteLoadingStatus(state);
    expect(result).toBe(isFavoriteLoading);
  });

  it('should return offer', () => {
    const { offer } = state[NameSpace.OffersData];
    const result = getDataOffer(state);
    expect(result).toBe(offer);
  });

  it('should return offerCard', () => {
    const { offerCard } = state[NameSpace.OffersData];
    const result = getDataCard(state);
    expect(result).toBe(offerCard);
  });

  it('should return offers', () => {
    const { offers } = state[NameSpace.OffersData];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return favoriteOffer', () => {
    const { favoriteOffers } = state[NameSpace.OffersData];
    const result = getFavoriteOffers(state);
    expect(result).toBe(favoriteOffers);
  });

  it('should return fevoriteLength', () => {
    const {favoriteOffers} = state[NameSpace.OffersData];
    const result = getFavoritesLength(state);
    expect(result).toBe(favoriteOffers.length);
  });
});
