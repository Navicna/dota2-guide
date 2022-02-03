import {AppState} from '../../App';

export const getHeroComplexitySearchFilter = (state: AppState) => {
  return state.dotaReducer.complexityFilter;
};

export const getHeroAttributeSearchFilter = (state: AppState) => {
  return state.dotaReducer.attributeFilter;
};
