import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

declare const window: any;
declare const module: any;
export default function configureStore(preloadedState): Redux.Store {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(browserHistory))
    )
  );
  return store;
}
