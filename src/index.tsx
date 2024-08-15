import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import { cardOffers } from './mocks/offers/card-offers';
import ErrorMessage from './components/error-message/error-message';
import { checkAuth } from './store/thunk-action/user';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        cardOffers={cardOffers}
      />
    </Provider>
  </React.StrictMode>,
);
