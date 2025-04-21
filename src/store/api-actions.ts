import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, User } from '../types/state';
import { Offer, ExtendedOffer, FavoriteOffer } from '../types/offer';
import { Review, NewComment } from '../types/review';
import { AuthData } from '../types/auth-type';
import { UserData } from '../types/user-data-type';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoute, APIRoute } from '../constants';
import { loading } from '../store/offers-load/offers-load';

export const fetchOffersAction = createAsyncThunk<Offer[], boolean, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (isFavoriteChange, { dispatch, extra: api }) => {
    dispatch(loading(isFavoriteChange));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchAroundOffersAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/AroundOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferPageAction = createAsyncThunk<ExtendedOffer | undefined, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offer',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ExtendedOffer>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/favorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const postFavoriteAction = createAsyncThunk<void, FavoriteOffer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/favoriteStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    dispatch(fetchFavoriteOffersAction());
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/reviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, NewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/review',
  async ({ pageId, comment, rating }, { dispatch, extra: api }) => {

    await api.post<NewComment>(`${APIRoute.Comments}/${pageId}`, { comment, rating });
    dispatch(fetchReviewsAction(pageId));
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  },
);
export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(checkAuthAction());
    dispatch(redirectToRoute(AppRoute.Main));
    return (email);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction(true));
  },
);
