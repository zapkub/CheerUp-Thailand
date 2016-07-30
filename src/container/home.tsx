import * as React from 'react';
import { connect } from 'react-redux';
import { FacebookButton } from '../components/SocialButton';
import * as AuthActions from '../actions/auth.actions';
import UserInfo from '../components/UserInfo';

interface IHomeProps {
  userInfo: AuthActions.IFBUserInfo;
  isLoading: boolean;
}

export class Home extends React.Component<IHomeProps, {}> {
  render(): JSX.Element {
    return (
    <div>
      <div>
        <UserInfo isLoading={this.props.isLoading} userInfo={this.props.userInfo} />
      </div>
      {
        this.props.userInfo ?
        <FacebookButton text={`สวัสดี ${this.props.userInfo.name}`} onClick={() => {}}/>
        :
        <FacebookButton text='เริ่มส่งแรงเชียร์' onClick={() => {}}/>
      }

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

  };
}
export default connect<{userInfo: AuthActions.IFBUserInfo}, {}, {}>(mapStoreToProps, mapDispatchToProps)(Home);
