import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Diamond} from '../../components/Diamond';
import {InvisibleHeader} from '../../components/InvisibleHeader';
import {
  DotaHeroesInterfaceUpdated,
  HeroSummaryProps,
} from '../../interfaces/heroes.interfaces';
import {
  fetchHeroAttribute,
  fetchHeroCharacter,
} from '../../services/heroes.services';
import {TextBox, ViewBox} from '../../ui';
import {ImageBox} from '../../ui';
import {getHeroSummary} from '../../utils/HeroSummary';
import {screenWidth} from '../../utils/Metrics';
import {getAttribute, handleHeroName} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';
import {useCarouselHeroesDetails} from '../../hooks/useCarouselHeroesDetails';
import Icon from '../../ui/icons';

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

  return (
    <ViewBox bgColor={Colors.darker} flex={1} alignItems="center" pt={32}>
      <InvisibleHeader />
      {!disableLeftChevron && (
        <ViewBox position="absolute" left={8} top={150}>
          <TouchableOpacity
            disabled={disableLeftChevron}
            onPress={() => handleHeroCarousel('back')}>
            <Icon path="chevron_back" size={50} />
          </TouchableOpacity>
        </ViewBox>
      )}
      {!disableRightChevron && (
        <ViewBox position="absolute" right={8} top={150}>
          <TouchableOpacity
            disabled={disableRightChevron}
            onPress={() => handleHeroCarousel('forward')}>
            <Icon path="chevron_forward" size={50} />
          </TouchableOpacity>
        </ViewBox>
      )}

      <View style={styles.characterContainer}>
        <ImageBox
          height={300}
          width={300}
          source={{uri: heroCharacter}}
          resizeMode="contain"
        />
      </View>

      <ViewBox flex={1} width={screenWidth}>
        <ViewBox
          flexDirection="row"
          alignItems="center"
          marginBottom={8}
          marginTop={16}>
          <ImageBox source={{uri: heroAttribute}} height={30} width={30} />
          <TextBox fontSize={20} ml={8} fontStyle="semi_bold">
            {getAttribute(heroDetails.primaryAttr)?.toUpperCase()}
          </TextBox>
        </ViewBox>
        <TextBox fontSize={40} fontStyle="bold">
          {heroName}
        </TextBox>
        {!!heroSummary && (
          <TextBox fontSize={20} mt={4} color="lightskyblue" fontStyle="bold">
            {heroSummary.title}
          </TextBox>
        )}
        {!!heroSummary && (
          <TextBox fontSize={18} mt={8}>
            {heroSummary.shortDescription}
          </TextBox>
        )}
        <ViewBox flexDirection="row" alignItems="center" mt={8}>
          <TextBox fontSize={18} mr={16}>
            Complexidade
          </TextBox>
          {Array(heroDetails.heroComplexity)
            .fill(null)
            .map((_, i) => (
              <Diamond key={i} bgColor={'white'} />
            ))}
        </ViewBox>
      </ViewBox>
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    ...defaultShadow,
  },
});
