import * as React from 'react';
import {Router, Route, IndexRedirect, IndexRoute} from 'react-router';
import Home from './container/home';
import App from './App';
import './actions/auth.actions';


export default (
  <Route path='/' component={App}>
    <Route path='home' component={Home} />
    <IndexRedirect to='home' />
  </Route>
);
