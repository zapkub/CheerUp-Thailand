
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

import { auth } from './reducers/auth.reducer';

const rootReducers = combineReducers({auth, routing: routerReducer});
export default rootReducers;
