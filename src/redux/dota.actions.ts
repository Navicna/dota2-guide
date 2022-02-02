import {DotaReduxEnum} from './dota.types';

export function dispatchHeroComplexityFilter(complexityFilter: number) {
  return {
    type: DotaReduxEnum.COMPLEXITY_FILTER,
    payload: {
      complexityFilter,
    },
  };
}
