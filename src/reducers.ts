
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

import { auth } from './reducers/auth.reducer';
import { result } from './reducers/result.reducer';
import { app } from './reducers/app.reducer';
const rootReducers = combineReducers({auth, app, result, routing: routerReducer});
export default rootReducers;
