import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useRef, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute } from '../../constants';
import { getDisabledStatus } from '../../store/user-authorization/selectors';
import Logo from '../../components/logo/logo';
import {CITY_NAMES, getRandomIntInclusive} from '../../components/utils';

export default function Login(): JSX.Element {
  const randomIndex = getRandomIntInclusive(0, CITY_NAMES.length - 1);
  const randomCity = CITY_NAMES[randomIndex];

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const disabledStatus = useAppSelector(getDisabledStatus);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Шесть городов: Авторизация</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  data-testid="loginElement"
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  data-testid="passwordElement"
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="\w+\W?\g" title="Пароль должен содержать по крайней мере одно число и одну букву"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={disabledStatus}>
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`${AppRoute.Main}?city=${randomCity}`}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
