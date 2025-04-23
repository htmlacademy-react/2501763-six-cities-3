export const dataMain = {
  rentalOffersAmount: 312,
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer',
  NotFound = 'not-found'
}

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum NameSpace {
  OffersData = 'offers',
  ReviewsData = 'reviews',
  User = 'user',
  AppActions = 'actions',
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 300;

export const DEFAULT_RATING = 0;

export const INITIAL_CITY = 'Paris';

export const INITIAL_SORT = 'Popular';
