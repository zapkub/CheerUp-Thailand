import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { AtheleList, AtheleObject } from '../components/AtheleList';
import Atheles from '../assets';
import { FacebookButton } from '../components/SocialButton';
import { HashTag, Sponsor} from '../components/HashTag';

import * as ResultActions from '../actions/result.actions';

const styles = require('../styles/athele.scss');
interface IAthele  {
  next(): void;
  selectAthele(atheleIndex?: number): void;
}
class Athele extends React.Component<IAthele, any> {
  render(): JSX.Element {
    return (<div className={styles.container} >
      <img className={styles.mainLogo} src={require('../assets/images/Welcome-logo.png')} />
      <AtheleList list={Atheles.athleleList} onChange={this.props.selectAthele} />
      <FacebookButton text={`เลือกภาพนักกีฬา`} onClick={this.props.next} />
      <Sponsor />
    </div>);
  }
};
function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return {
    next: () => {
      dispatch(push('/message'));
    },
    selectAthele: (atheleIndex?: number) => {
      ga('send', 'event', {
                eventCategory: 'athele',
                eventAction: 'select',
                eventLabel: Atheles[atheleIndex],
      });
      dispatch(ResultActions.setAtheleIndex(Atheles.athleleList[atheleIndex]));
    },
  };
}
export default connect<{}, {next(): void; selectAthele(athele?: number): void; }, {}>(mapStateToProps, mapDispatchToProps)(Athele);
