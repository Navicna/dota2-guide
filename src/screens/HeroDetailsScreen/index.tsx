import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {InvisibleHeader} from '../../components/InvisibleHeader';
import {DotaHeroesInterfaceUpdated} from '../../interfaces/heroes.interfaces';
import {
  fetchHeroAttribute,
  fetchHeroCharacter,
} from '../../services/heroes.services';
import {screenWidth} from '../../utils/Metrics';
import {getAttribute} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';

type ScreenProps = {
  params: {
    heroDetailsUpdated: DotaHeroesInterfaceUpdated;
  };
};

export function HeroDetailsScreen() {
  const route = useRoute<RouteProp<ScreenProps, 'params'>>();
  const heroDetails = route.params.heroDetailsUpdated;
  const heroCharacter = fetchHeroCharacter(heroDetails.heroPath);
  const heroAttribute = fetchHeroAttribute(heroDetails.primaryAttr);

  function handleHeroName() {
    return heroDetails.heroName.replace(' ', '\n');
  }

  return (
    <View style={styles.container}>
      <InvisibleHeader />
      <View>
        <Image
          style={styles.heroImage}
          source={{uri: heroCharacter}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerSummary}>
        <View style={styles.heroAttributeContainer}>
          <Image
            source={{uri: heroAttribute}}
            style={styles.heroAttributeImage}
          />
          <Text style={styles.heroAttributeTitle}>
            {getAttribute(heroDetails.primaryAttr)?.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.heroName}>{handleHeroName()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darker,
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
  heroImage: {
    height: 300,
    width: 300,
  },
  heroAttributeContainer: {
    ...defaultShadow,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  heroAttributeImage: {
    height: 30,
    width: 30,
  },
  heroAttributeTitle: {color: 'white', fontSize: 20, marginLeft: 8},
  heroName: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  containerSummary: {flex: 1, width: screenWidth},
});
