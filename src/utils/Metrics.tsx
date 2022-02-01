import {Dimensions} from 'react-native';

const PADDING_VALUE = 8;

export function getHeroImageProportion(numColums = 3) {
  return Dimensions.get('screen').width / numColums - PADDING_VALUE * 2;
}
