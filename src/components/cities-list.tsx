import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/index';
import {selectCity} from '../store/action';
import {getCity} from '../store/app-actions/selectors';

type CitiesListProp = {
  cities: string[];
}

export default function CitiesList(props: CitiesListProp): JSX.Element {
  const {cities} = props;
  const dispatch = useAppDispatch();
  const actualCity = useAppSelector(getCity);

  const handleCitySelect = (event: MouseEvent<HTMLLIElement>)=>{
    const value = event.currentTarget.innerText;
    dispatch(selectCity(value));
  };
  return(
    <ul className="locations__list tabs__list">
      {
        cities.map((item)=>(
          <li
            onClick={handleCitySelect}
            key={item} className="locations__item"
          >
            <Link className={
              item === actualCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'
            } to="#"
            >
              <span>{item}</span>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
