import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { getFavoriteOffers } from '../../store/offers-load/selectors';
import Header from '../../components/header/header';
import FavoriteEmpty from '../favorites-empty/favorites-empty';
import FavoritePlaceCard from '../../components/favorite-place-card/favorite-place-card';
import { fetchFavoriteOffersAction } from '../../store/api-actions';

export default function Favorite(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const allFavoriteCities: string[] = [];
  favoriteOffers.forEach((item) => {
    allFavoriteCities.push(item.city.name);
  });
  const favoriteCities = [...new Set(favoriteOffers.map((item) => item.city.name))];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (favoriteOffers.length === 0) {
    return (
      <FavoriteEmpty />
    );
  }
  return (
    <div className="page" data-testid="favorite-page">
      <Helmet>
        <title>Шесть городов. Избранное</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoriteCities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.map((item) => (
                      item.city.name === city ?
                        <FavoritePlaceCard offer={item} key={item.id} />
                        : null
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
