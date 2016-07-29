import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './route';

import { syncHistoryWithStore } from 'react-router-redux';

// import preload style

// different store in dev , prod
let Store: any = {};
if (process.env.DEVELOPMENT) {
  Store = require( './store/store.dev.config.ts').default;
}else {
  Store = require( './store/store.prod.config.ts').default;
}

const initialState = (window as any).__INITIAL_STATE__;

const store = Store(initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('readAroundApp')
);
