import * as ReduxActions from 'redux-actions';

export const BEGIN_AUTHEN_TO_FACEBOOK = 'BEGIN_AUTHEN_TO_FACEBOOK';
export const DONE_AUTHEN_TO_FACEBOOK = 'DONE_AUTHEN_TO_FACEBOOK';
export const FAILED_AUTHEN_TO_FACEVOOK = 'FAILED_AUTHEN_TO_FACEBOOK';
export const IS_AUTHEN_LOADING = 'IS_AUTHEN_LOADING';

export interface IFBUserInfo {
    id: string;
    name: string;
    email: string;
}


export const setUserInfo = ReduxActions.createAction<IFBUserInfo, IFBUserInfo>(DONE_AUTHEN_TO_FACEBOOK);
export const isFBloading = ReduxActions.createAction<boolean, boolean>(IS_AUTHEN_LOADING);


export const checkFacebookSession = () => dispatch => {
    dispatch(isFBloading(true));
    FB.getLoginStatus(function(Response): void{
      if (Response.status === 'connected') {
        FB.api('/me?fields=id,name,email', 'get', function(response): void{
          dispatch(setUserInfo(response as IFBUserInfo));
          dispatch(isFBloading(false));
        });
      } else {
          dispatch(isFBloading(false));
      }
    });
};

export const loginWithFacebook = () => dispatch => {
    FB.login(function(fbResponse: any): void {
        console.log(fbResponse);
        if (fbResponse.status === 'connected') {
            dispatch(checkFacebookSession());
        }else {
            dispatch(isFBloading(false));
        }
    });
};


