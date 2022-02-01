import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getHeroImageProportion} from '../../utils/Metrics';

const PICTURE_WIDTH = getHeroImageProportion();

export function HeroPicture({heroPath}: {heroPath: string}) {
  return (
    <View style={styles.view}>
      <Image
        source={{
          uri: `https://cdn.dota2.com/apps/dota2/images/heroes/${heroPath}_full.png`,
        }}
        style={styles.image}
      />
    </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
