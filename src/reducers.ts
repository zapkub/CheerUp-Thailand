
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

import { auth } from './reducers/auth.reducer';
import { result } from './reducers/result.reducer';
const rootReducers = combineReducers({auth, result, routing: routerReducer});
export default rootReducers;
