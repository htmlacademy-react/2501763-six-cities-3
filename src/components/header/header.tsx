import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import Logo from '../../components/logo/logo';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser, getAuthCheckedStatus } from '../../store/user-authorization/selectors';
import { getFavoritesLength, getFavoriteOffers } from '../../store/offers-load/selectors';

export default function Header(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const favoritesLength = useAppSelector(getFavoritesLength);
  const favorites = useAppSelector(getFavoriteOffers);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {isAuthChecked && authStatus === AuthorizationStatus.Auth ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{
                      backgroundImage:
                        `url(${user ? user.avatarUrl : '../img/avatar.svg'})`
                    }}
                    >
                    </div>
                    <span className="header__user-name user__name">
                      {user ? user.email : ''}
                    </span>
                    <span className="header__favorite-count">{favoritesLength ? favoritesLength : favorites.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    className="header__nav-link" to={AppRoute.Main}
                    data-testid="logout-link"
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul> :
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
}
