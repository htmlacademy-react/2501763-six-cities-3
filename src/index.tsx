import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { dataMain } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      rentalOffersAmount={dataMain.rentalOffersAmount}
    />
  </React.StrictMode>
);
