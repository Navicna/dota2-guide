import {useNavigation} from '@react-navigation/core';

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DotaHeroesInterfaceUpdated} from '../interfaces/heroes.interfaces';

import {ImageBox} from '../ui';
import {getHeroImageProportion} from '../utils/Metrics';
import {defaultShadow} from '../utils/Style';

const PICTURE_WIDTH = getHeroImageProportion();

type HeroPictureProps = {
  heroDetails: DotaHeroesInterfaceUpdated;
  filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
  position: number;
};

export default function HeroPicture({
  heroDetails,
  filteredDotaHeroes,
  position,
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
      <View style={styles.view}>
        <ImageBox
          source={{
            uri: heroDetails.heroImage,
          }}
          height={PICTURE_WIDTH / 2}
          width={PICTURE_WIDTH}
          mb={8}
          mr={8}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view: {
    ...defaultShadow,
  },
});
