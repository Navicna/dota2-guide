import {DotaReduxEnum} from './dota.types';

type InitialState = {
  complexityFilter: number;
  attributeFilter: string;
};

const INITIAL_STATE = {
  complexityFilter: 0,
  attributeFilter: '',
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
    case DotaReduxEnum.ATTRIBUTE_FILTER:
      return {...state, attributeFilter: action.payload?.attributeFilter};
    default:
      return state;
  }
}
