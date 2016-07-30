import * as React from 'react';
import { IFBUserInfo } from '../actions/auth.actions';
interface IUserInfoPropsType {
  userInfo: IFBUserInfo;
  isLoading: boolean;
}

const DisplayInfo = (props: IFBUserInfo) =>
(
  <div>
    {
      props.id ? props.name : ''
    }
  </div>
);

export default (props: IUserInfoPropsType) =>
(
  <div>
    { props.isLoading ? 'กำลังโหลด' : <DisplayInfo {...props.userInfo} />}
  </div>
);
