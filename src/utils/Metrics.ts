import {Dimensions, Platform} from 'react-native';
import {ScreenDimensions} from '../interfaces/metrics.interfaces';

const PADDING_VALUE = 8;
const NUMBER_OF_SIDES = 2;

const LATERAL_MARGIN = 16;

const {width, height} = Dimensions.get('screen');

export const iconMusicPositionHelper = (safeAreaValue: number) => {
  const extraValue =
    Platform.OS === 'android' ? PADDING_VALUE * 2 : PADDING_VALUE;
  return safeAreaValue + extraValue;
};

export const screenWidth =
  Dimensions.get('screen').width - LATERAL_MARGIN * NUMBER_OF_SIDES;

export function getHeroImageProportion(numColums = 1) {
  return (
    Dimensions.get('screen').width / numColums -
    PADDING_VALUE * 2 * NUMBER_OF_SIDES
  );
}

export function screenProportion(
  dimension: 'HEIGHT' | 'WIDTH' | 'FULL_WIDTH' | 'FULL_HEIGHT',
  percentage?: number,
) {
  switch (dimension) {
    case ScreenDimensions.HEIGHT:
      return percentage ? height * percentage : 0;
    case ScreenDimensions.WIDTH:
      return percentage ? width * percentage : 0;
    case ScreenDimensions.FULL_HEIGHT:
      return height;
    case ScreenDimensions.FULL_WIDTH:
      return width;
    default:
      return 0;
  }
}
