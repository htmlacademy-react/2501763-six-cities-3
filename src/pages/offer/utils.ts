import { Offer } from '../../types/offer';

const MAX_NEAR_OFFERS = 3;

export const getNearOffers = (offer: Offer, offers: Offer[]): Offer[] => {
  const nearOffers: Offer[] = [];
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id) {
      nearOffers.push(offers[i]);
    }
    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }
  return nearOffers;
};
