import * as React from 'react';
import * as classNames from 'classnames';
const styles = require('../styles/result.scss');
export const CanvasResultImage = (props: {src: string, show: boolean, onClose(): void}) => (
  <div className={
    classNames({
      [`${styles.resultImageWrap}`]: true,
      [`${styles.active}`]: props.show,
    })
  }>
    <img src={props.src} /> <br/>
    {`แตะค้างที่รูปเพื่อ save ภาพได้เลยจ้า`} <br/>
    <button onClick={props.onClose} >ปิด</button>
  </div>
);

