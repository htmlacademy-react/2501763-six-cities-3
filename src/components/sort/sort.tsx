import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { MouseEvent } from 'react';
import { sortOffers } from '../../store/app-actions/app-actions';
import { useEffect } from 'react';
import { Sorts } from '../utils';
import { getSort } from '../../store/app-actions/selectors';

export default function Sort(): JSX.Element {

  const [sortTypesList, setSortTypesList] = useState(false);

  function handleSortingArrow() {
    setSortTypesList(!sortTypesList);
  }
  useEffect(() => {
    if (sortTypesList) {
      const onEscKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === 'Escape') {
          setSortTypesList(!sortTypesList);
        }
      };
      document.addEventListener('keydown', onEscKeyDown);
      return () => {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }

  }, [sortTypesList]);
  const dispatch = useAppDispatch();
  const actualSort = useAppSelector(getSort);

  const handleSortSelect = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.innerText;
    dispatch(sortOffers(value));
    setSortTypesList(!sortTypesList);
  };

  return (
    <form data-testid="sort-form" className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span data-testid="sort-arrow" onClick={handleSortingArrow} className="places__sorting-type" tabIndex={0}>
        {actualSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul data-testid="type-items-container" className={sortTypesList ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom'}>
        {Object.values(Sorts).map((type: string) => (
          <li
            data-testid="sort-type"
            onClick={handleSortSelect}
            key={type}
            className={type === actualSort ? 'places__option places__option--active' : 'places__option'}
            tabIndex={0}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
