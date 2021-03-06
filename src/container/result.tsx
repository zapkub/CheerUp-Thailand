import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { push } from 'react-router-redux';
import { AtheleObject } from '../components/AtheleList';
import Assets from '../assets';

import * as ShareActions from '../actions/share.actions';
import * as ResultActions from '../actions/result.actions';
import { Sponsor, HashTag } from '../components/HashTag';
import { FacebookButton } from '../components/SocialButton';
import { CanvasResultImage } from '../components/Canvas';
// import '../utils/canvasToBlob';
import * as saveAs from '../utils/FileSaver';
require('../utils/canvasToBlob.js');
const styles = require('../styles/result.scss');
const MobileDetect = require('mobile-detect');

interface IResultPropsType {
  athele: AtheleObject;
  messageIndex: number;
  startOver(): void;
  drawResult(canvas: HTMLCanvasElement): void;
  shareToFB(canvas: HTMLCanvasElement): void;
}
class Result extends React.Component<IResultPropsType, {resultBlobURL: string, showResult: boolean}> {
  constructor(props) {
    super(props);
    this.state = { resultBlobURL: '', showResult: false};
  }
  async componentDidMount(): Promise<void> {
    ga('send', 'event', {
      eventCategory: 'Result',
      eventAction: 'select',
      eventLabel: this.props.athele.name,
    });
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;
    this.props.drawResult(canvas);
  }
  handleShare(): void {
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;
    this.props.shareToFB(canvas);
  }
  saveToFile(): void {
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;
    const md = new MobileDetect(window.navigator.userAgent);

    (canvas as any).toBlob((blob) => {
      // saveAs(blob, 'CheerThai.png');
      if (md.mobile()) {
        const url = window.URL.createObjectURL(blob);
        // window.location.href = url;
        this.setState({resultBlobURL: url, showResult: true});
      } else {
        saveAs(blob, 'CheerThai.png');
      }
    });
  }
  render(): JSX.Element {
    return (
      <div className={styles.container} >
        <img style={{ height: '150px', padding: '20px' }} src={require('../assets/images/Welcome-logo.png') } />
        <div className={styles.wrap} >
          <div className={styles.resultFrame} >
            <canvas className={styles.resultCanvas} ref='canvas' />
          </div>
        </div>
        <div className={styles.controlWrap}>
          <FacebookButton width={150} text={`SAVE`} onClick={this.saveToFile.bind(this)} />
          <FacebookButton width={150} text={`SHARE`} onClick={ this.handleShare.bind(this)} />
          <FacebookButton width={150} onClick={this.props.startOver} text={`เล่นใหม่`} />
        </div>
        <CanvasResultImage onClose={this.closeResult.bind(this)} show={this.state.showResult} src={this.state.resultBlobURL} />
        <HashTag />
        <Sponsor />
      </div>);
  }
  closeResult() {
    this.setState({resultBlobURL: undefined, showResult: false});
  }
};
function mapStateToProps(store) {
  return {
    athele: store.result.athele,
    messageIndex: store.result.messageIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    drawResult: (canvas: HTMLCanvasElement) => {
      dispatch(ResultActions.drawResult(canvas));
    },
    startOver: () => {
      dispatch(push('/home'));
    },
    shareToFB: (canvas: HTMLCanvasElement) => {
      dispatch(ShareActions.shareToFB(canvas));
    },
  };
}
export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(Result);
