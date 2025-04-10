import {AppRoute} from '../../constants';
import {Sorts} from '../../components/sort/const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSort, toggleSortsMenu} from '../../store/offers-load/offers-load';
import {selectSortOffers, selectIsFiltersOpen} from '../../store/offers-load/selectors';

export const Sort = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isOpened = useAppSelector(selectIsFiltersOpen);

  const activeSort = useAppSelector(selectSortOffers);

  const sortFormClickHandler = () => {
    dispatch(toggleSortsMenu());
    navigate(AppRoute.Main);
  };

  const sortFormChangeHandler = (filter: string) => {
    dispatch(changeSort(filter));
    navigate(AppRoute.Main);
  };

  return (
    <form className="places__sorting" action="#" method="get"
      onClick={sortFormClickHandler}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {' '}{activeSort}{' '}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {
          Object.values(Sorts)
            .map((filter) => (
              <li
                className={`places__option ${filter === activeSort ? 'places__option--active' : ''}`}
                tabIndex={0}
                key={filter}
                onClick={() => {
                  sortFormChangeHandler(filter);
                }}
              >
                {filter}
              </li>)
            )
        }
      </ul>
    </form>
  );
};
