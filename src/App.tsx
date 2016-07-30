
import * as React from 'react';
require('./styles/reset.nomodscss');
const styles = require('./styles/main.scss');
export default class App extends React.Component<any, any> {

  render(): JSX.Element {
    return (<div className={styles.container} >{this.props.children} </div>);
  }
};
