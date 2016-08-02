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
  handleKeyPress(e: KeyboardEvent): void;
}
class Message extends React.Component<IMessagePropsType , {}> {
  componentDidMount(): void {
    document.addEventListener('keydown', this.props.handleKeyPress.bind(this), false);
  }
  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.props.handleKeyPress.bind(this));
  }
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
              {`นักกีฬา${this.props.athele.sportTitle}ทีมชาติไทย`}
            </div>
          </div>
          <div className={styles.atheleFrame}>
            <img src={require('../assets/images/' + this.props.athele.previewURI)} />
          </div>
          <MessageList onChange={this.props.handleMessageSelect} lists={Assets.messageList} index={this.props.selectedIndex} />
         </div>
         <div className={styles.buttonWrap} >
          <FacebookButton width={120} text={`ย้อนกลับ`} onClick={ this.props.next }/>
          <FacebookButton text={`เลือกแรงเชียร์`} onClick={ this.props.next }/>
         </div>
        <HashTag />
        <Sponsor />
      </div>
    );
  }
};

function mapStateToProps(store): any {
  return {
    athele: store.result.athele,
    selectedIndex: store.result.messageIndex,
  };
}
function mapDispatchToProps(dispatch): any {
  return {
    handleKeyPress: (e) => {
      const code = e.keyCode || e.which || e.key ;
      console.log(code);
      if (code === 38) {
        dispatch({type: ResultActions.MESSAGE_MOVE_DOWN});
      } else if (code === 40) {
        dispatch({type: ResultActions.MESSAGE_MOVE_UP});
      }
    },
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
