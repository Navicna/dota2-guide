import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Images} from '../../assets/image';
import {Diamond, InvisibleHeader} from '../../components/index';

import {
  DotaHeroesInterfaceUpdated,
  HeroSummaryProps,
} from '../../interfaces/heroes.interfaces';
import {ImageBox, TextBox, ViewBox} from '../../ui';
import Icon from '../../ui/icons';
import {screenProportion} from '../../utils/Metrics';
import {getAttribute} from '../../utils/String';
import {defaultShadow} from '../../utils/Style';

const imgBgStyles = (safeAreaValue: number) => ({
  height: screenProportion('HEIGHT', 0.4) + safeAreaValue,
  width: screenProportion('FULL_WIDTH'),
  alignItems: 'center',
  paddingTop: safeAreaValue,
});

export const HeroCharacterHeader: React.FC<{
  disableLeftChevron: boolean;
  disableRightChevron: boolean;
  safeAreaValue: number;
  onPressBackward: () => void;
  onPressForward: () => void;
  heroCharacter: string;
}> = ({
  disableLeftChevron,
  disableRightChevron,
  safeAreaValue,
  onPressBackward,
  onPressForward,
  heroCharacter,
}) => (
  <ImageBackground
    style={imgBgStyles(safeAreaValue)}
    source={{
      uri: Images.heroCharacterBgUri,
    }}>
    <InvisibleHeader />
    {!disableLeftChevron && (
      <ViewBox position="absolute" left={8} top={150 + safeAreaValue}>
        <TouchableOpacity
          disabled={disableLeftChevron}
          onPress={onPressBackward}>
          <Icon path="chevron_back" size={40} />
        </TouchableOpacity>
      </ViewBox>
    )}
    {!disableRightChevron && (
      <ViewBox position="absolute" right={8} top={150 + safeAreaValue}>
        <TouchableOpacity
          disabled={disableRightChevron}
          onPress={onPressForward}>
          <Icon path="chevron_forward" size={40} />
        </TouchableOpacity>
      </ViewBox>
    )}
  </ImageBackground>
);

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
  heroDetails: DotaHeroesInterfaceUpdated;
  heroAttribute: string;
  heroName: string;
  heroSummary?: HeroSummaryProps;
  primaryAttr: string;
}> = ({heroDetails, heroAttribute, heroName, heroSummary, primaryAttr}) => (
  <ViewBox
    flex={1}
    width={screenProportion('FULL_WIDTH')}
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    bgColor={Colors.darker}
    mt={-16}
    ph={16}>
    <ViewBox flexDirection="row" alignItems="center" mb={8} mt={16}>
      <ImageBox source={{uri: heroAttribute}} height={30} width={30} />
      <TextBox fontSize={20} ml={8} fontStyle="semi_bold">
        {getAttribute(primaryAttr)?.toUpperCase()}
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
);

const styles = StyleSheet.create({
  characterContainer: {
    ...defaultShadow,
  },
});
