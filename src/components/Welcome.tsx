import * as React from 'react';
const styles =  require('../styles/Welcome.scss');
const bannerLogo = require('../assets/images/Welcome-logo.png');
const bannerAthele = require('../assets/images/Welcome-athele.png');

export const Welcome = () => (<div>
  <div className={styles.bannerContainer}>
    <img className={styles.logo} src={bannerLogo} />
    <img className={styles.athele} src={bannerAthele} />
  </div>
</div>);
