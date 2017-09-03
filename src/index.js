import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store/configureStore';
import './styles/app.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
