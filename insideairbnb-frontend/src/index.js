import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import { fetchListings } from './redux/slices/listingsSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchListings())
root.render(
  <Provider store={store}>
    <App />
  </Provider>


);

