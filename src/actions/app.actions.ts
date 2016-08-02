import * as ReduxActions from 'redux-actions';
export const APP_IS_WORKING = 'APP_IS_WORKING';
export const APP_IS_FREE = 'APP_IS_FREE';

export const showLoading = ReduxActions.createAction<boolean, boolean>(APP_IS_WORKING);
export const hideLoading = ReduxActions.createAction<boolean, boolean>(APP_IS_FREE);