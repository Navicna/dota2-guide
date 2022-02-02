import {useNavigation} from '@react-navigation/core';

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DotaHeroesInterfaceUpdated} from '../../interfaces/heroes.interfaces';
import {fetchHeroImage} from '../../services/heroes.services';
import {getHeroImageProportion} from '../../utils/Metrics';
import {defaultShadow} from '../../utils/Style';

const PICTURE_WIDTH = getHeroImageProportion();

type HeroPictureProps = {
  heroDetails: DotaHeroesInterfaceUpdated;
};

export function HeroPicture({heroDetails}: HeroPictureProps) {
  const {navigate} = useNavigation();
  const heroImage = fetchHeroImage(heroDetails.heroPath);

  const heroDetailsUpdated = {
    ...heroDetails,
    heroImage,
  };

  function handleNavigate() {
    navigate('HeroDetails' as never, {heroDetailsUpdated} as never);
  }

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.view}>
        <Image
          source={{
            uri: heroImage,
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: PICTURE_WIDTH / 2,
    width: PICTURE_WIDTH,

    marginBottom: 8,
    marginRight: 8,
  },
  view: {
    ...defaultShadow,
  },
});
