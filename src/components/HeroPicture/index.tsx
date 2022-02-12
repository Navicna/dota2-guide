import {useNavigation} from '@react-navigation/core';

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DotaHeroesInterfaceUpdated} from '../../interfaces/heroes.interfaces';
import {fetchHeroImage} from '../../services/heroes.services';
import {ImageBox} from '../../ui';
import {getHeroImageProportion} from '../../utils/Metrics';
import {defaultShadow} from '../../utils/Style';

const PICTURE_WIDTH = getHeroImageProportion();

type HeroPictureProps = {
  heroDetails: DotaHeroesInterfaceUpdated;
  filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
};

export function HeroPicture({
  heroDetails,
  filteredDotaHeroes,
}: HeroPictureProps) {
  const {navigate} = useNavigation();
  const heroImage = fetchHeroImage(heroDetails.heroPath);

  const heroDetailsUpdated = {
    ...heroDetails,
    heroImage,
  };

  function handleNavigate() {
    navigate(
      'HeroDetails' as never,
      {heroDetailsUpdated, filteredDotaHeroes} as never,
    );
  }

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.view}>
        <ImageBox
          source={{
            uri: heroImage,
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
