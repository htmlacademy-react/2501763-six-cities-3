import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../constants';
import { CITY_LOCATIONS } from '../components/utils';

const INITIAL_CITY = 'Paris';

export default function CitiesList(): JSX.Element {

  const [searchParams] = useSearchParams();
  const actualCity = searchParams.get('city') || INITIAL_CITY;

  return (
    <ul className="locations__list tabs__list" data-testid="cities-container">
      {
        CITY_LOCATIONS.map((item) => (
          <li
            key={item.name} className="locations__item" data-testid="city"
          >
            <Link
              className={item.name === actualCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to={`${AppRoute.Main}?city=${item.name}`}
            >
              <span>{item.name}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
