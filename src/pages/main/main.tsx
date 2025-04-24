import { Helmet } from 'react-helmet-async';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { getOffersByCity, getSortedOffers } from '../main/common';
import MainEmpty from '../main-empty/main-empty';
import Sort from '../../components/sort/sort';
import Header from '../../components/header/header';
import { useSearchParams } from 'react-router-dom';
import { getOffers, selectSortOffers } from '../../store/offers-load/selectors';
import { useAppSelector } from '../../hooks/index';
import { getActiveOfferId } from '../../store/app-actions/selectors';
import { INITIAL_CITY } from '../../constants';

export default function Main(): JSX.Element {
  const selectedOfferId = useAppSelector(getActiveOfferId);
  const offers = useAppSelector(getOffers);
  const [searchParams] = useSearchParams();
  const searchCityParams = searchParams.get('city') || INITIAL_CITY;
  const actualSort = useAppSelector(selectSortOffers);
  const actualCity = searchCityParams;

  const filteredOffers = getSortedOffers(getOffersByCity(actualCity, offers), actualSort);
  const selectedOffer = filteredOffers.find((offer) => offer.id === selectedOfferId);
  const cardsCount = filteredOffers.length;

  if (cardsCount === 0) {
    return <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Helmet>
        <title>Шесть городов. Главная</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsCount} {cardsCount > 1 ? 'places' : 'place'} to stay in {actualCity}</b>
              <Sort />
              <div className="cities__places-list places__list tabs__content">
                <CardsList offers={filteredOffers} isNearList={false}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredOffers} selectedOffer={selectedOffer} actualCity={actualCity} isOfferPageMap={false}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
