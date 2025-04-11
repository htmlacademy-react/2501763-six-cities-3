import {Link, useSearchParams} from 'react-router-dom';
import {MouseEvent} from 'react';
import {useAppDispatch} from '../hooks/index';
import {selectCity} from '../store/app-actions/app-actions';
import {AppRoute} from '../constants';
import {CITY_LOCATIONS} from '../components/utils';

const INITIAL_CITY = 'Paris';

export default function CitiesList(): JSX.Element {

  const [searchParams] = useSearchParams();
  const actualCity = searchParams.get('city') || INITIAL_CITY;

  const dispatch = useAppDispatch();

  const handleCitySelect = (event: MouseEvent<HTMLLIElement>)=>{
    const value = event.currentTarget.innerText;
    dispatch(selectCity(value));
  };
  return(
    <ul className="locations__list tabs__list">
      {
        CITY_LOCATIONS.map((item)=>(
          <li
            onClick={handleCitySelect}
            key={item.name} className="locations__item"
          >
            <Link className={
              item.name === actualCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'
            } to={`${AppRoute.Main}?city=${item.name}`}
            >
              <span>{item.name}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
