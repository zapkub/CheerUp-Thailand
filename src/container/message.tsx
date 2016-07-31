import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import Assets from '../assets';
import { push } from 'react-router-redux';
import { MessageList } from '../components/MessageList';
import { AtheleObject } from '../components/AtheleList';
import * as ResultActions from '../actions/result.actions';
import { FacebookButton } from '../components/SocialButton';
import { Sponsor, HashTag } from '../components/HashTag';

const styles = require('../styles/message.scss');


interface IMessagePropsType extends ReactRouter.RouteComponentProps<{}, {}> {
  athele?: AtheleObject;
  selectedIndex: number;
  next(): void;
  handleMessageSelect(index: number): void;
}
class Message extends React.Component<IMessagePropsType , {}> {
  render(): JSX.Element {
    return (
      <div className={classNames(styles.container)} >
         <img style={{height: '150px',padding: '20px'}} src={require('../assets/images/Welcome-logo.png')} />
         <div className={classNames(styles.wrap,styles.message)}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>
            {this.props.athele.name}
            </div>
            <div className={styles.sportTitle}>
              {this.props.athele.sportTitle}
            </div>
          </div>
          <div className={styles.atheleFrame}>
            <img src={require('../assets/images/' + this.props.athele.previewURI)} />
          </div>
          <MessageList onChange={this.props.handleMessageSelect} lists={Assets.messageList} index={this.props.selectedIndex} />
         </div>
         <FacebookButton text={`เลือกแรงเชียร์`} onClick={ this.props.next }/>
        <HashTag />
        <Sponsor />
      </div>
    );
  }
};

function mapStateToProps(store) {
  return {
    athele: store.result.athele,
    selectedIndex: store.result.messageIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleMessageSelect: (index: number) => {
      ga('send', 'event', {
                eventCategory: 'message',
                eventAction: 'select',
                eventLabel: Assets.messageList[index],
      });
      dispatch(ResultActions.setMessageIndex(index));
    },
    next: () => {
      dispatch(push('/result'));
    },
  };
}

export default connect<{athele?: AtheleObject; selectedIndex: number}, {}, {}>(mapStateToProps, mapDispatchToProps)(Message);
