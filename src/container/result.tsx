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
// import '../utils/canvasToBlob';
import * as saveAs from '../utils/FileSaver';
// const saveAs  = require('../utils/FileSaver.js');
const styles = require('../styles/result.scss');

interface IResultPropsType {
  athele: AtheleObject;
  messageIndex: number;
  startOver(): void;
  drawResult(canvas: HTMLCanvasElement): void;
  shareToFB(canvas: HTMLCanvasElement): void;
}
class Result extends React.Component<IResultPropsType, {}> {

  async componentDidMount(): Promise<void> {
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;
    this.props.drawResult(canvas);
  }
  handleShare (): void {
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;
    this.props.shareToFB(canvas);
  }
  saveToFile (): void {
    const canvas: HTMLCanvasElement = (this.refs as any).canvas as HTMLCanvasElement;

    (canvas as any).toBlob((blob) => {
      saveAs(blob, 'Cheerup.png');
    });

  }
  render(): JSX.Element {
    return (
      <div className={styles.container} >
        <img style={{height: '150px',padding: '20px'}} src={require('../assets/images/Welcome-logo.png')} />
        <div className={styles.wrap} >
          <div className={styles.resultFrame} >
            <canvas ref='canvas' />
          </div>
        </div>
        <div className={styles.controlWrap}>
          <FacebookButton width={150} text={`Save ภาพ`} onClick={this.saveToFile.bind(this)} />
          <FacebookButton width={150} text={`Share`} onClick={ this.handleShare.bind(this)} />
          <FacebookButton width={150} onClick={this.props.startOver} text={`เริ่มเล่นใหม่`} />
        </div>
        <HashTag />
        <Sponsor />
      </div>);
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
export default connect<{ }, { }, { }>(mapStateToProps, mapDispatchToProps)(Result);
