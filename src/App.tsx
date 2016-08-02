
import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactRouter from 'react-router';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
require('./styles/reset.nomodscss');
require('./styles/routingTransition.nomodscss');
const styles = require('./styles/main.scss');

const LoadingDialog = function (props: {isActive: boolean}): JSX.Element {
  return (<div className={
    classNames(
      styles.loadingDialogContainer,
      {
        [`${styles.active}`]: props.isActive,
      }
    )
  } >
    <div className={styles.loadingDialogWrap} >
      <div className='sk-fading-circle'>
        <div className='sk-circle1 sk-circle'></div>
        <div className='sk-circle2 sk-circle'></div>
        <div className='sk-circle3 sk-circle'></div>
        <div className='sk-circle4 sk-circle'></div>
        <div className='sk-circle5 sk-circle'></div>
        <div className='sk-circle6 sk-circle'></div>
        <div className='sk-circle7 sk-circle'></div>
        <div className='sk-circle8 sk-circle'></div>
        <div className='sk-circle9 sk-circle'></div>
        <div className='sk-circle10 sk-circle'></div>
        <div className='sk-circle11 sk-circle'></div>
        <div className='sk-circle12 sk-circle'></div>
      </div>
    </div>
    <div>
      {`Loading...`}
    </div>
  </div>);
};

interface IAppPropsType extends ReactRouter.RouteComponentProps<{}, {}> {
  isShowLoading: boolean;
}
class App extends React.Component<IAppPropsType, {}> {

  render(): JSX.Element {
    return (
      <div className={styles.container} >
        <LoadingDialog isActive={this.props.isShowLoading}/>
        <ReactCSSTransitionGroup
          component='div'
          transitionName='routing'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname,
          }) }
        </ReactCSSTransitionGroup>
      </div>);
  }
};

export default connect<{isShowLoading: boolean}, {}, {}>(
  (store) => {
    return {
      isShowLoading: store.app.isLoading,
    };
  }
)(App);
