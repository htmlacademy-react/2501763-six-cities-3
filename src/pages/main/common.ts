import {Offer} from '../../types/offer';

export const getOffersByCity = (city:string, offers:Offer[]):Offer[]=>{
  const offersByCity = offers.filter((offer)=>
    offer.city.name === city);
  return offersByCity;
};
