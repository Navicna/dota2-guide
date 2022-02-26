import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Diamond} from '../../components/index';

import {HeroSummaryProps} from '../../interfaces/heroes.interfaces';
import {ImageBox, TextBox, ViewBox} from '../../ui';

import {screenProportion} from '../../utils/Metrics';
import {getAttribute} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';

export const ITEM_SIZE = screenProportion('FULL_WIDTH');
export const CARD_HEIGHT = screenProportion('HEIGHT', 0.6);

export const SPACING = 8;

export const SCREEN_WIDTH = screenProportion('FULL_WIDTH');
export const SCREEN_HEIGHT = screenProportion('FULL_HEIGHT');

export const SPACER_ITEM_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;

export const BACKDROP_HEIGHT = screenProportion('HEIGHT', 0.3);

export const HeroCharacter: React.FC<{heroCharacter: string}> = ({
  heroCharacter,
}) => (
  <View style={styles.characterContainer}>
    <ImageBox
      height={300}
      width={300}
      source={{uri: heroCharacter}}
      resizeMode="contain"
    />
  </View>
);

export const HeroSummarySection: React.FC<{
  heroComplexity: number;
  heroAttribute: string;
  heroName: string;
  heroSummary?: HeroSummaryProps;
  primaryAttr: string;
}> = ({heroComplexity, heroAttribute, heroName, heroSummary, primaryAttr}) => (
  <ViewBox
    flex={1}
    width={screenProportion('FULL_WIDTH')}
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    bgColor={Colors.darker}
    mt={-16}
    ph={16}>
    <ViewBox flexDirection="row" alignItems="center" mb={4} mt={8}>
      <ImageBox source={{uri: heroAttribute}} height={18} width={18} />
      <TextBox fontSize={16} ml={8} fontStyle="semi_bold">
        {getAttribute(primaryAttr)?.toUpperCase()}
      </TextBox>
    </ViewBox>
    <TextBox fontSize={20} fontStyle="bold">
      {heroName}
    </TextBox>
    {!!heroSummary && (
      <TextBox fontSize={16} mt={4} color="lightskyblue" fontStyle="bold">
        {heroSummary.title}
      </TextBox>
    )}
    <ViewBox flexDirection="row" alignItems="center" mt={8}>
      <TextBox fontSize={16} mr={16}>
        Complexidade
      </TextBox>
      {Array(heroComplexity)
        .fill(null)
        .map((_, i) => (
          <Diamond size={12} key={i} bgColor={'white'} />
        ))}
    </ViewBox>
    {!!heroSummary && (
      <TextBox fontSize={14} mt={8}>
        {heroSummary.shortDescription}
      </TextBox>
    )}
  </ViewBox>
);

const styles = StyleSheet.create({
  characterContainer: {
    ...defaultShadow,
  },
});
