import {AppState} from '../../App';

export const getHeroComplexitySearchFilter = (state: AppState) => {
  return state.dotaReducer.complexityFilter;
};
