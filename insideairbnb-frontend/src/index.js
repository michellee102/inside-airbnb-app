import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
import { fetchListings, fetchNeighbourhoods } from './redux/slices/listingsSlice';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchListings())
store.dispatch(fetchNeighbourhoods())

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>

);

