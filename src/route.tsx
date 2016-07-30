import * as React from 'react';
import {Router, Route, IndexRedirect, IndexRoute} from 'react-router';
import Home from './container/home';
import Athele from './container/athele';
import Message from './container/message';
import App from './App';
import './actions/auth.actions';


export default (
  <Route path='/' component={App}>
    <Route path='home' component={Home} />
    <Route path='athele' component={Athele} />
    <Route path='message' component={Message} />
    <IndexRedirect to='home' />
  </Route>
);
