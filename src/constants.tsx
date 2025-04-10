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
  NotFound = '/*'
}

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum NameSpace {
  OffersData = 'DATA_OFFERS',
  ReviewsData = 'DATA_REVIEWS',
  User = 'USER',
  AppActions = 'APP_ACTIONS',
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

export const DEFAULT_RATING = 0;
