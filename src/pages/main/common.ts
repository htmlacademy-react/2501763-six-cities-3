import { Offer } from '../../types/offer';
import { Sorts } from '../../components/utils';

export const getOffersByCity = (city: string, offers: Offer[]): Offer[] => {
  const offersByCity = offers.filter((offer) =>
    offer.city.name === city);
  return offersByCity;
};

export const getSortedOffers = (offers: Offer[], sortType: string): Offer[] => {
  const slicedOffers = [...offers];
  switch (sortType) {
    case Sorts.POPULAR:
      return offers;
    case Sorts.PRICE_LOW_TO_HIGH:
      slicedOffers.sort((a, b) => a.price - b.price);
      return slicedOffers;
    case Sorts.PRICE_HIGH_TO_LOW:
      slicedOffers.sort((a, b) => b.price - a.price);
      return slicedOffers;
    case Sorts.TOP_RATED_FIRST:
      slicedOffers.sort((a, b) => b.rating - a.rating);
      return slicedOffers;
    default:
      return offers;
  }
};
