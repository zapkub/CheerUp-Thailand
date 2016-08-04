import * as React from 'react';
import { connect } from 'react-redux';
import { FacebookButton } from '../components/SocialButton';
import * as AuthActions from '../actions/auth.actions';
import UserInfo from '../components/UserInfo';
import { Welcome } from '../components/Welcome';
import { HashTag, Sponsor } from '../components/HashTag';
import { push }  from 'react-router-redux';
const styles = Object.assign({}, require('../styles/home.scss'));
interface IHomeProps {
  userInfo: AuthActions.IFBUserInfo;
  isLoading: boolean;
  loginWithFB(): void;
  beginCheerUp(): void;
}

export class Home extends React.Component<IHomeProps, {}> {

  render(): JSX.Element {
    return (
    <div className= {styles.container} >
      <Welcome />
{
      //   <div>
      //   <UserInfo isLoading={this.props.isLoading} userInfo={this.props.userInfo} />
      // </div>
}
      {
        this.props.userInfo ?
        <FacebookButton text={`เริ่มส่งแรงเชียร์`} onClick={this.props.beginCheerUp}/>
        :
        <FacebookButton icon={true} text='Login ผ่าน Facebook' onClick={this.props.loginWithFB}/>
      }
      <HashTag />
      <Sponsor />
    </div>);
  }
};
function mapStoreToProps (store): any {
  return {
    userInfo: store.auth.userInfo,
    isLoading: store.auth.isLoading,
  };
}
function mapDispatchToProps(dispatch): any {
  return {
    loginWithFB : () => {
      dispatch(AuthActions.loginWithFacebook());
    },
    beginCheerUp: () => {
      dispatch(push('athele'));
    },
  };
}
export default connect<{userInfo: AuthActions.IFBUserInfo}, {loginWithFB(): void; beginCheerUp(): void; }, {}>(mapStoreToProps, mapDispatchToProps)(Home);
