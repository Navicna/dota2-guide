import {DotaReduxEnum} from './dota.types';

type InitialState = {
  complexityFilter: number;
};

const INITIAL_STATE = {
  complexityFilter: 0,
};

type Action = {
  type: string;
  payload: any;
};

export default function dotaReducer(
  state: InitialState = INITIAL_STATE,
  action: Action,
) {
  switch (action.type) {
    case DotaReduxEnum.COMPLEXITY_FILTER:
      return {...state, complexityFilter: action.payload?.complexityFilter};
    default:
      return state;
  }
}
