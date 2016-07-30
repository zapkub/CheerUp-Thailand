import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';


import * as createLogger from 'redux-logger';
import rootReducer from '../reducers';

declare const window: any;
declare const module: any;
export default function configureStore(preloadedState): Redux.Store {

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger() ),
      applyMiddleware(routerMiddleware(hashHistory)),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers.ts', () => {
      const nextRootReducer = require('../reducers.ts').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
