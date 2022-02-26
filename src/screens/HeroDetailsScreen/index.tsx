import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {Svg, Rect} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';

// import LinearGradient from 'react-native-linear-gradient';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {DotaHeroesInterfaceUpdated} from '../../interfaces/heroes.interfaces';

import {ViewBox, ImageBox} from '../../ui';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import * as HDS from './styles';

import {screenProportion} from '../../utils/Metrics';

import {InvisibleHeader} from '../../components';
import {Images} from '../../assets/image';

type ScreenProps = {
  params: {
    heroDetails: DotaHeroesInterfaceUpdated;
    filteredDotaHeroes: DotaHeroesInterfaceUpdated[];
    position: number;
  };
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function HeroDetailsScreen() {
  const route = useRoute<RouteProp<ScreenProps, 'params'>>();
  const filteredDotaHeroes = route.params.filteredDotaHeroes;
  const heroPositionArray = route.params.position;

  const {top: SAFE_AREA_TOP_VALUE} = useSafeAreaInsets();

  // Handle Flatlist
  const flatlistRef = React.useRef();
  const scrollToIndex = (position: number) => {
    flatlistRef?.current?.scrollToIndex({animated: true, index: position});
  };
  const getItemLayout = (_: any, index: number) => ({
    length: HDS.ITEM_SIZE,
    offset: HDS.ITEM_SIZE * index,
    index,
  });

  useFocusEffect(
    React.useCallback(() => {
      scrollToIndex(heroPositionArray);
    }, [heroPositionArray]),
  );

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Backdrop = () => {
    return (
      <ViewBox
        position="absolute"
        top={0}
        width={HDS.SCREEN_WIDTH}
        height={HDS.BACKDROP_HEIGHT}>
        {filteredDotaHeroes.map(
          (item: DotaHeroesInterfaceUpdated, index: number) => {
            const inputRange = [
              (index - 1) * HDS.ITEM_SIZE,
              index * HDS.ITEM_SIZE,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-HDS.SCREEN_WIDTH, 0],
            });
            return (
              <MaskedView
                maskElement={
                  <AnimatedSvg
                    viewBox={`0 0 ${HDS.SCREEN_WIDTH} ${screenProportion(
                      'FULL_HEIGHT',
                    )}`}
                    height={HDS.SCREEN_HEIGHT}
                    width={HDS.SCREEN_WIDTH}
                    style={{transform: [{translateX}]}}>
                    <Rect
                      x="0"
                      y="0"
                      width={HDS.SCREEN_WIDTH}
                      height={HDS.SCREEN_HEIGHT}
                      fill="red"
                    />
                  </AnimatedSvg>
                }
                style={styles.svg}>
                <ImageBox
                  width={HDS.SCREEN_WIDTH}
                  height={HDS.BACKDROP_HEIGHT}
                  source={{uri: item.heroImage}}
                  resizeMode="cover"
                />
              </MaskedView>
            );
          },
        )}
      </ViewBox>
    );
  };

  return (
    <ViewBox
      flex={1}
      bgColor="gray"
      alignItems="center"
      justifyContent="center">
      <Backdrop />
      <InvisibleHeader />

      <ViewBox
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        position="absolute"
        bottom={0}>
        <ImageBox
          height={HDS.SCREEN_HEIGHT - HDS.BACKDROP_HEIGHT + 16}
          width={HDS.SCREEN_WIDTH}
          source={{uri: Images.heroCharacterBgUri}}
          style={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
        />
      </ViewBox>
      {/* <LinearGradient
        colors={[Colors.darker, 'transparent']}
        style={{
          width: HDS.SCREEN_WIDTH,
          height: HDS.BACKDROP_HEIGHT,
          position: 'absolute',
          top: HDS.BACKDROP_HEIGHT,
        }}
      /> */}
      <Animated.FlatList
        data={filteredDotaHeroes}
        keyExtractor={item => item.heroPath}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        contentContainerStyle={styles.flatlistContainer}
        horizontal
        snapToInterval={HDS.ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * HDS.ITEM_SIZE,
            index * HDS.ITEM_SIZE,
            (index + 1) * HDS.ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          return (
            <>
              {index === 0 && <ViewBox width={HDS.SPACER_ITEM_SIZE} />}
              <ViewBox width={HDS.ITEM_SIZE}>
                <Animated.View
                  style={[
                    styles.animatedView,
                    {
                      paddingTop: SAFE_AREA_TOP_VALUE + 48,
                      transform: [{translateY}],
                    },
                  ]}>
                  <ImageBox
                    height={HDS.CARD_HEIGHT - 100}
                    width={HDS.CARD_HEIGHT - 100}
                    source={{uri: item.heroCharacter}}
                    resizeMode="contain"
                  />
                  <HDS.HeroSummarySection
                    heroComplexity={item.heroComplexity}
                    heroAttribute={item.heroAttribute}
                    heroName={item.heroName}
                    heroSummary={item.heroSummary}
                    primaryAttr={item.primaryAttr}
                  />
                </Animated.View>
              </ViewBox>
            </>
          );
        }}
      />
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    marginHorizontal: HDS.SPACING,
    padding: HDS.SPACING * 2,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 34,
    height: HDS.SCREEN_HEIGHT,
  },
  flatlistContainer: {
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
});
