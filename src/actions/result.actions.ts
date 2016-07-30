import * as ReduxActions from 'redux-actions';
import { AtheleObject } from '../components/AtheleList';
export const SET_CURRENT_ATHELE = 'SET_CURRENT_ATHELE';
export const SET_CURRENT_MESSAGE = 'SET_CURRENT_MESSAGE';

export const setAtheleIndex = ReduxActions.createAction<AtheleObject, AtheleObject>(SET_CURRENT_ATHELE);
export const setMessageIndex = ReduxActions.createAction<number, number>(SET_CURRENT_MESSAGE);
