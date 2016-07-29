import * as React from 'react';
import {Router, Route, IndexRedirect, IndexRoute} from 'react-router';
import Home from './container/home';
class App extends React.Component<any, any> {
  return(): JSX.Element {
    return (<div></div>);
  }
}


export default (
  <Route path='/' component={App}>
    <Route path='home' component={Home} />
    <IndexRedirect to='home' />
  </Route>
);
