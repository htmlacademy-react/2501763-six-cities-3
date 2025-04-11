import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';
import {Helmet} from 'react-helmet-async';
import {postFavoriteAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {getFavoriteOffers} from '../../store/offers-load/selectors';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';

export default function Favorite(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers: Offer[] = useAppSelector(getFavoriteOffers);

  const allFavoriteCities: string[] = [];
  favoriteOffers.forEach((item)=>{
    allFavoriteCities.push(item.city.name);
  });
  const favoriteCities = [... new Set(allFavoriteCities)];

  const handleBookmarkButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const placeCard = evt.currentTarget.closest('article');
    const dataSetOffer = placeCard ? placeCard.dataset.offer : '';
    const offerClicked: Offer | null = dataSetOffer ? JSON.parse(dataSetOffer) as Offer : null;

    if(placeCard && offerClicked){
      dispatch(postFavoriteAction({
        offerId: offerClicked.id,
        favoriteStatus: !offerClicked.isFavorite ? 1 : 0
      }));
    }
  };
  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Избранное</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoriteCities.map((city)=>(
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    { favoriteOffers.map((item: Offer)=> (
                      item.city.name === city ?
                        <article key={item.id}
                          className="favorites__card place-card"
                          data-offer={JSON.stringify(item)}
                        >
                          {item.isPremium ?
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div> : ''}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to="#">
                              <img
                                className="place-card__image"
                                src="img/apartment-small-03.jpg"
                                width={150}
                                height={110}
                                alt="Place image"
                              />
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">€{item.price}</b>
                                <span className="place-card__price-text">
                            /&nbsp;night
                                </span>
                              </div>
                              <button
                                onClick={handleBookmarkButtonClick}
                                className={item.isFavorite ?
                                  'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
                                type="button"
                              >
                                <svg
                                  className="place-card__bookmark-icon"
                                  width={18}
                                  height={19}
                                >
                                  <use xlinkHref="#icon-bookmark" />
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{ width: '100%' }} />
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to="#"> {item.title}</Link>
                            </h2>
                            <p className="place-card__type">{item.type}</p>
                          </div>
                        </article>
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
