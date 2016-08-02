import * as React from 'react';
const styles = require('../styles/hashTag.scss');
export const Sponsor = () =>
(<div className={styles.sponsor} >
  <img style={{width: '100%'}} src={require('../assets/images/sponsor.png')} />
</div>);

export const HashTag = () => (
  <div className={styles.hashTag} >
    <span> <i className='fi-social-facebook'></i> {`เชียร์ไทยสุดใจ`}</span>
    <span>{`#เชียร์ไทยสุดใจ`}</span>
    <span>{`#CHEERTHAI`}</span>
  </div>);
