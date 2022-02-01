import {Dimensions} from 'react-native';

const PADDING_VALUE = 8;
const NUMBER_OF_SIDES = 2;

const LATERAL_MARGIN = 16;

export const screenWidth =
  Dimensions.get('screen').width - LATERAL_MARGIN * NUMBER_OF_SIDES;

export function getHeroImageProportion(numColums = 3) {
  return (
    Dimensions.get('screen').width / numColums - PADDING_VALUE * NUMBER_OF_SIDES
  );
}
