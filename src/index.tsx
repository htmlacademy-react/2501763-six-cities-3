import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store/index';
import { ToastContainer } from 'react-toastify';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './components/browser-history';

store.dispatch(fetchOffersAction(false));
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
