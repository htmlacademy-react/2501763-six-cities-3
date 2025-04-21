import Header from '../../components/header/header';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CitiesList from '../../components/cities-list/cities-list';
import { INITIAL_CITY } from '../../constants';

export default function MainEmpty(): JSX.Element {
  const [searchParams,] = useSearchParams();
  const searchCityParams = searchParams.get('city') || INITIAL_CITY;
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {searchCityParams}
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}
