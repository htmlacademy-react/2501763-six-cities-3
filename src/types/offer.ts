type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
export type Offers = Offer[];

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ExtendedOffer = {
  id: Offer['id'];
  title: Offer['title'];
  type: Offer['type'];
  price: Offer['price'];
  isFavorite: Offer['isFavorite'];
  isPremium: Offer['isPremium'];
  rating: Offer['rating'];
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type FavoriteOffer = {
  offerId: string;
  status: number;
}
