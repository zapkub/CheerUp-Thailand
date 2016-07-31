import * as React from 'react';
import {Router, Route, IndexRedirect, IndexRoute} from 'react-router';
import Home from './container/home';
import Athele from './container/athele';
import Message from './container/message';
import Result from './container/result';

import App from './App';
import './actions/auth.actions';


export default (
  <Route path='/' component={App}>
    <Route path='home' component={Home} />
    <Route path='_=_' component={Home} />
    <Route path='athele' component={Athele} />
    <Route path='message' component={Message} />
    <Route path='result' component={Result} />
    <IndexRedirect to='home' />
  </Route>
);
