import Assets from '../assets';
import * as ReduxActions from 'redux-actions';
import { AtheleObject } from '../components/AtheleList';
import * as ResultActions from '../actions/result.actions';
interface IResultState {
  athele?: AtheleObject;
  themeIndex: number;
  messageIndex: number;
  message?: string;
};

export const result = (state: IResultState, action: ReduxActions.Action<any> ) => {
  if (!state) {state = {themeIndex: 0, messageIndex: 0, athele: Assets.athleleList[0], message: Assets.messageList[0] }; };

  const nextState = Object.assign({}, state);
  switch (action.type) {
    case ResultActions.SET_CURRENT_ATHELE :
      nextState.athele = action.payload;
      break;
    case ResultActions.SET_CURRENT_MESSAGE :
      nextState.messageIndex = action.payload;
      nextState.message = Assets.messageList[action.payload];
      break;
    case ResultActions.MESSAGE_MOVE_DOWN :
      nextState.messageIndex = nextState.messageIndex > 0 ? state.messageIndex - 1 : 0;
      nextState.message = Assets.messageList[nextState.messageIndex];
      break;
    case ResultActions.MESSAGE_MOVE_UP :
      nextState.messageIndex = Assets.messageList.length - 1 > state.messageIndex ? state.messageIndex + 1 : Assets.messageList.length - 1;
      nextState.message = Assets.messageList[nextState.messageIndex];
    default:
    break;
  }
  return nextState;
};
