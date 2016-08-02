import * as ReduxActions from 'redux-actions';
import * as AppActions from '../actions/app.actions';

export const app = (state: {isLoading: boolean}, action: ReduxActions.Action<any>) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case AppActions.APP_IS_WORKING :
      nextState.isLoading = true;
      break;
    case AppActions.APP_IS_FREE :
      nextState.isLoading = false;
      break;
    default:
      break;
  }
  return nextState;
};
