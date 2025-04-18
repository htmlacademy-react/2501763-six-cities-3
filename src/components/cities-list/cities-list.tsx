import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { CITY_LOCATIONS } from '../../components/utils';
import { INITIAL_CITY } from '../../constants';
import cn from 'classnames';

export default function CitiesList(): JSX.Element {
  const [searchParams] = useSearchParams();
  const actualCity = searchParams.get('city') || INITIAL_CITY;

  return (
    <ul className="locations__list tabs__list" data-testid="cities-container">
      {
        CITY_LOCATIONS.map((item) => (
          <li
            key={item.name}
            className="locations__item"
            data-testid="city"
          >
            <Link
              className={cn('locations__item-link tabs__item', {
                'tabs__item--active': item.name === actualCity
              })}
              to={`${AppRoute.Main}?city=${item.name}`}
            >
              <span>{item.name}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
