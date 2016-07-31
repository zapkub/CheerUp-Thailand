import * as AuthActions from '../actions/auth.actions';
import * as ReduxActions from 'redux-actions';

export interface IAuthState {
  status: number;
  isLoading: boolean;
  userInfo: AuthActions.IFBUserInfo;
  profilePictureURL?: string;
}
export const auth = (state: IAuthState, action: ReduxActions.Action<any>) => {
  if ( !state ) {
    return {
      status: 0,
      isLoading: false,
    };
  }

  let nextState = Object.assign({}, state);
  switch (action.type) {
    case AuthActions.DONE_AUTHEN_TO_FACEBOOK :
      nextState.status = 1;
      nextState.userInfo = action.payload;
      nextState.profilePictureURL = `https://graph.facebook.com/${action.payload.id}/picture?type=large&width=720&height=720`;
    break;
    case AuthActions.IS_AUTHEN_LOADING :
      nextState.isLoading = action.payload;
    default:
    break;
  }

  return nextState;
};
