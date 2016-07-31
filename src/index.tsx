import * as React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './route';
import * as config from '../app.config';
import * as AuthActions from './actions/auth.actions';
import { syncHistoryWithStore } from 'react-router-redux';

// import preload style

// different store in dev , prod
let Store: any = {};
if (process.env.DEVELOPMENT) {
  Store = require('./store/store.dev.config.ts').default;
} else {
  Store = require('./store/store.prod.config.ts').default;
}

const initialState = (window as any).__INITIAL_STATE__;

const store = Store(initialState);
const history = syncHistoryWithStore(hashHistory, store);

window.onload = function(): void {
    window.fbAsyncInit = function (): void {
      console.log('init FB with Redux');
      FB.init(
        {
          appId: config.fbAppId,
          xfbml: true,
          version: 'v2.0',
        }
      );
      store.dispatch(AuthActions.checkFacebookSession(
        function (): void {
          document.getElementById('root').style.opacity = '1';
          render(
            <Provider store={store}>
              <Router history={history} routes={routes} />
            </Provider>,
            document.getElementById('root')
          );
        }
      ));
    };
};

// send page view stats
hashHistory.listen( (location)  => {
  // console.log('change route to ' + location.pathname);
  ga('send', {
    hitType: 'pageview',
    page: location.pathname,
  });
});
