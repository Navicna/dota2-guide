import {DotaReduxEnum} from './dota.types';

export function dispatchHeroComplexityFilter(complexityFilter: number) {
  return {
    type: DotaReduxEnum.COMPLEXITY_FILTER,
    payload: {
      complexityFilter,
    },
  };
}

export function dispatchHeroAttributeFilter(attributeFilter: string) {
  return {
    type: DotaReduxEnum.ATTRIBUTE_FILTER,
    payload: {
      attributeFilter,
    },
  };
}
