import * as Assets from '../assets';
import * as ReduxActions from 'redux-actions';
import { AtheleObject } from '../components/AtheleList';
import * as ResultActions from '../actions/result.actions';
interface IResultState {
  athele?: AtheleObject;
  themeIndex: number;
  messageIndex: number;
};

export const result = (state: IResultState, action: ReduxActions.Action<any> ) => {
  if (!state) {state = {themeIndex: 0, messageIndex: 0, athele: Assets.default.athleleList[0] }; };

  const nextState = Object.assign({}, state);
  switch (action.type) {
    case ResultActions.SET_CURRENT_ATHELE :
      nextState.athele = action.payload;
      break;
    case ResultActions.SET_CURRENT_MESSAGE :
      nextState.messageIndex = action.payload;
      break;
    default:
    break;
  }
  return nextState;
};
