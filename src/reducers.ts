
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

const rootReducers = combineReducers({menubar, routing: routerReducer});
export default rootReducers;
