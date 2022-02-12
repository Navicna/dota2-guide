import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {InvisibleHeader} from '../../components/InvisibleHeader';
import {
  DotaHeroesInterfaceUpdated,
  HeroSummaryProps,
} from '../../interfaces/heroes.interfaces';
import {
  fetchHeroAttribute,
  fetchHeroCharacter,
} from '../../services/heroes.services';
import {getHeroSummary} from '../../utils/HeroSummary';
import {screenWidth} from '../../utils/Metrics';
import {getAttribute, handleHeroName} from '../../utils/String';
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
  const heroSummary: HeroSummaryProps | undefined = getHeroSummary(
    heroDetails.heroPath,
  );
  const heroName = handleHeroName(heroDetails.heroName);

  return (
    <View style={styles.container}>
      <InvisibleHeader />
      <View style={styles.characterContainer}>
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
        <Text style={styles.heroName}>{heroName}</Text>
        {!!heroSummary && (
          <Text style={styles.heroTitle}>{heroSummary.title}</Text>
        )}
        {!!heroSummary && (
          <Text style={styles.heroDescription}>
            {heroSummary.shortDescription}
          </Text>
        )}

        <Text style={styles.heroDescription}>
          {`Complexidade do Herói: ${heroDetails.heroComplexity}`}
        </Text>
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
  characterContainer: {
    ...defaultShadow,
  },
  heroAttributeContainer: {
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
  heroTitle: {
    color: 'lightskyblue',
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold',
  },
  heroDescription: {
    color: 'white',
    fontSize: 18,
    marginTop: 8,
  },
  containerSummary: {flex: 1, width: screenWidth},
});
