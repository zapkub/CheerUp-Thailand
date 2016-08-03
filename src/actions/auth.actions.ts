import * as ReduxActions from 'redux-actions';
import * as AppActions from './app.actions';
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


export const checkFacebookSession = (callback?: Function) => dispatch => {
    dispatch(isFBloading(true));
    dispatch(AppActions.showLoading());
    FB.getLoginStatus(function (Response): void {
        if (Response.status === 'connected') {
            FB.api('/me?fields=id,name,email', 'get', function (response): void {
                dispatch(setUserInfo(response as IFBUserInfo));
                dispatch(isFBloading(false));
                dispatch(AppActions.hideLoading());
                if (callback) {
                    callback(Response);
                }
            });
        } else {
            dispatch(isFBloading(false));
            dispatch(AppActions.hideLoading());
            if (callback) {
                    callback(Response);
            }
        }
    });
};

export const loginWithFacebook = () => dispatch => {
    FB.login(function (fbResponse: any): void {
        console.log(fbResponse);
        if (fbResponse.status === 'connected') {
            dispatch(checkFacebookSession());
        } else {
            dispatch(isFBloading(false));
        }
    });
};


