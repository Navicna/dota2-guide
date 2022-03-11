import {useNavigation} from '@react-navigation/core';

import React from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import {DotaHeroesInterfaceUpdated} from '../interfaces/heroes.interfaces';

import {ImageBox} from '../ui';
import {getHeroImageProportion} from '../utils/Metrics';

export const PICTURE_WIDTH = getHeroImageProportion();
export const PICTURE_HEIGHT = PICTURE_WIDTH / 2.5;

export const PICTURE_MARGIN_BOTTOM = 12;

type HeroPictureProps = {
  heroDetails: DotaHeroesInterfaceUpdated;
  filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
  position: number;
  animatedViewStyle: {
    opacity: any;
    scale: any;
  };
};

export default function HeroPicture({
  heroDetails,
  filteredDotaHeroes,
  position,
  animatedViewStyle,
}: HeroPictureProps) {
  const {navigate} = useNavigation();

  function handleNavigate() {
    navigate(
      'HeroDetails' as never,
      {heroDetails, filteredDotaHeroes, position} as never,
    );
  }

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <Animated.View
        style={{
          opacity: animatedViewStyle.opacity,
          transform: [{scale: animatedViewStyle.scale}],
        }}>
        <ImageBox
          source={{
            uri: heroDetails.heroImage,
          }}
          height={PICTURE_HEIGHT}
          width={PICTURE_WIDTH}
          mb={PICTURE_MARGIN_BOTTOM}
          borderRadius={4}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
