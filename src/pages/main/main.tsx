import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo';
import {Offers} from '../../types/offer';
import CardsList from '../../components/cards-list';
import {useState} from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list';
import {getOffersByCity} from '../main/common';
import MainEmpty from '../main-empty/main-empty';
import {Sort} from '../../components/sort/sort';

type MainProps = {
  offers: Offers;
  cities: string[];
  actualCity: string;
}

export default function Main({offers, cities, actualCity}: MainProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(undefined);

  const filtredOffersByCity = getOffersByCity(actualCity, offers);
  const cardsCount = filtredOffersByCity.length;

  const handleListItemHover = (listItemId: string) => {
    setSelectedOfferId(listItemId);
  };

  const handleListItemOut = () => {
    setSelectedOfferId(undefined);
  };

  if (cardsCount === 0) {
    return <MainEmpty cities={cities} />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Шесть городов. Главная</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsCount} {cardsCount > 1 ? 'places' : 'place'} to stay in {actualCity}</b>
              <Sort />
              <div className="cities__places-list places__list tabs__content">
                <CardsList offers={filtredOffersByCity} onListItemHover={handleListItemHover} onListItemOut={handleListItemOut}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map offers={filtredOffersByCity} selectedOfferId={selectedOfferId} actualCity = {actualCity}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
