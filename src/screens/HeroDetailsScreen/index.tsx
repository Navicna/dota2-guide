import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  DotaHeroesInterfaceUpdated,
  HeroSummaryProps,
} from '../../interfaces/heroes.interfaces';
import {
  fetchHeroAttribute,
  fetchHeroCharacter,
} from '../../services/heroes.services';
import {ViewBox} from '../../ui';

import {getHeroSummary} from '../../utils/HeroSummary';

import {handleHeroName} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as HDS from './styles';
import {useCarouselHeroesDetails} from '../../hooks/index';

type ScreenProps = {
  params: {
    heroDetailsUpdated: DotaHeroesInterfaceUpdated;
    filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
  };
};

export function HeroDetailsScreen() {
  const route = useRoute<RouteProp<ScreenProps, 'params'>>();
  const heroDetailsUpdated = route.params.heroDetailsUpdated;
  const filteredDotaHeroes = route.params.filteredDotaHeroes;

  const {
    handleHeroCarousel,
    heroDetails,
    disableRightChevron,
    disableLeftChevron,
  } = useCarouselHeroesDetails(filteredDotaHeroes, heroDetailsUpdated);

  const heroCharacter = fetchHeroCharacter(heroDetails.heroPath);
  const heroAttribute = fetchHeroAttribute(heroDetails.primaryAttr);

  const heroSummary: HeroSummaryProps | undefined = getHeroSummary(
    heroDetails.heroPath,
  );
  const heroName = handleHeroName(heroDetails.heroName);

  const {top: SAFE_AREA_TOP_VALUE} = useSafeAreaInsets();

  return (
    <ScrollView style={styles.scrollview}>
      <ViewBox bgColor={Colors.darker} alignItems="center">
        <HDS.HeroCharacterHeader
          disableLeftChevron={disableLeftChevron}
          disableRightChevron={disableRightChevron}
          heroCharacter={heroCharacter}
          onPressBackward={() => handleHeroCarousel('back')}
          onPressForward={() => handleHeroCarousel('forward')}
          safeAreaValue={SAFE_AREA_TOP_VALUE}
        />
        <HDS.HeroSummarySection
          heroDetails={heroDetails}
          heroAttribute={heroAttribute}
          heroName={heroName}
          heroSummary={heroSummary}
        />
      </ViewBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    ...defaultShadow,
  },
  scrollview: {
    backgroundColor: Colors.darker,
    flex: 1,
  },
});
