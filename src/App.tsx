
import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactRouter from 'react-router';
require('./styles/reset.nomodscss');
require('./styles/routingTransition.nomodscss');
const styles = require('./styles/main.scss');

export default class App extends React.Component<ReactRouter.RouteComponentProps<{}, {}>, {}> {

  render(): JSX.Element {
    return (
      <div className={styles.container} >
        <ReactCSSTransitionGroup
            component='div'
            transitionName='routing'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname,
        })}
        </ReactCSSTransitionGroup>
      </div>);
  }
};
