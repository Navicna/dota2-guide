import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  DotaHeroesInterfaceUpdated,
  HeroSummaryProps,
} from '../../interfaces/heroes.interfaces';
import {
  fetchHeroAttribute,
  fetchHeroCharacter,
} from '../../services/heroes.services';
import {TextBox, ViewBox} from '../../ui';

import {getHeroSummary} from '../../utils/HeroSummary';

import {handleHeroName} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as HDS from './styles';
import {useCarouselHeroesDetails} from '../../hooks/index';

type ScreenProps = {
  params: {
    heroDetails: DotaHeroesInterfaceUpdated;
    filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
  };
};

export function HeroDetailsScreen() {
  const route = useRoute<RouteProp<ScreenProps, 'params'>>();
  const heroDetails = route.params.heroDetails;
  const filteredDotaHeroes = route.params.filteredDotaHeroes;

  // const {
  //   handleHeroCarousel,
  //   heroDetails,
  //   disableRightChevron,
  //   disableLeftChevron,
  // } = useCarouselHeroesDetails(filteredDotaHeroes, heroDetailsUpdated);

  const {top: SAFE_AREA_TOP_VALUE} = useSafeAreaInsets();

  console.tron.log({heroDetails});

  return (
    <ScrollView style={styles.scrollview}>
      <ViewBox bgColor={Colors.darker} alignItems="center">
        <FlatList
          horizontal
          pagingEnabled
          data={filteredDotaHeroes}
          renderItem={({item}) => {
            return (
              <ViewBox>
                <HDS.HeroCharacter heroCharacter={item.heroCharacter} />
                <HDS.HeroSummarySection
                  heroDetails={heroDetails}
                  heroAttribute={item.heroAttribute}
                  heroName={item.heroName}
                  heroSummary={item.heroSummary}
                  primaryAttr={item.primaryAttr}
                />
              </ViewBox>
            );
          }}
        />
        {/* <HDS.HeroCharacterHeader
          disableLeftChevron={disableLeftChevron}
          disableRightChevron={disableRightChevron}
          heroCharacter={heroCharacter}
          onPressBackward={() => handleHeroCarousel('back')}
          onPressForward={() => handleHeroCarousel('forward')}
          safeAreaValue={SAFE_AREA_TOP_VALUE}
        /> */}
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
