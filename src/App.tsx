
import * as React from 'react';
export default class App extends React.Component<any, any> {

  render(): JSX.Element {
    return (<div> Hi {this.props.children} </div>);
  }
};
