import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useDotaGuide} from '../context/DotaGuideContext';
import {fetchHeroCharacter} from '../services/heroes.services';
import {ImageBox, ViewBox} from '../ui';
import {screenProportion} from '../utils/Metrics';
import MaskedView from '@react-native-masked-view/masked-view';
import {Svg, Rect} from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ITEM_SIZE = screenProportion('WIDTH', 0.9);
const CARD_HEIGHT = screenProportion('HEIGHT', 0.6);

const SPACING = 8;

const SCREEN_WIDTH = screenProportion('FULL_WIDTH');

const SPACER_ITEM_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2;

const BACKDROP_HEIGHT = screenProportion('HEIGHT', 0.3);

export default function AnimatonsProjects() {
  const {dotaHeroes} = useDotaGuide();

  console.tron.log({dotaHeroes});

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Backdrop = ({scrollX}) => {
    return (
      <ViewBox
        position="absolute"
        top={0}
        width={SCREEN_WIDTH}
        height={BACKDROP_HEIGHT}>
        {dotaHeroes.map((item, index) => {
          const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-SCREEN_WIDTH, 0],
          });
          return (
            <MaskedView
              maskElement={
                <AnimatedSvg
                  viewBox={`0 0 ${SCREEN_WIDTH} ${screenProportion(
                    'FULL_HEIGHT',
                  )}`}
                  height={screenProportion('FULL_HEIGHT')}
                  width={SCREEN_WIDTH}
                  style={{transform: [{translateX}]}}>
                  <Rect
                    x="0"
                    y="0"
                    width={SCREEN_WIDTH}
                    height={screenProportion('FULL_HEIGHT')}
                    fill="red"
                  />
                </AnimatedSvg>
              }
              style={{position: 'absolute'}}>
              <ImageBox
                width={SCREEN_WIDTH}
                height={BACKDROP_HEIGHT}
                source={{uri: item.heroImage}}
                resizeMode="cover"
              />
            </MaskedView>
          );
        })}
        {/* <FlatList
          data={dotaHeroes}
          // initialNumToRender={50}
          maxToRenderPerBatch={20}
          renderItem={({item, index}) => {
            const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-SCREEN_WIDTH, 0],
            });
            // console.warn(item.heroName);
            return (
              <MaskedView
                maskElement={
                  <AnimatedSvg
                    viewBox={`0 0 ${SCREEN_WIDTH} ${screenProportion(
                      'FULL_HEIGHT',
                    )}`}
                    height={screenProportion('FULL_HEIGHT')}
                    width={SCREEN_WIDTH}
                    style={{transform: [{translateX}]}}>
                    <Rect
                      x="0"
                      y="0"
                      width={SCREEN_WIDTH}
                      height={screenProportion('FULL_HEIGHT')}
                      fill="red"
                    />
                  </AnimatedSvg>
                }
                style={{position: 'absolute'}}>
                <ImageBox
                  width={SCREEN_WIDTH}
                  height={BACKDROP_HEIGHT}
                  source={{uri: item.heroImage}}
                  resizeMode="cover"
                />
              </MaskedView>
            );
          }}
        /> */}

        {/* <LinearGradient
          colors={['transparent', 'white']}
          style={{
            width: SCREEN_WIDTH,
            height: BACKDROP_HEIGHT,
            position: 'absolute',
            bottom: 0,
          }}
        /> */}
      </ViewBox>
    );
  };

  return (
    <ViewBox
      flex={1}
      bgColor="gray"
      alignItems="center"
      justifyContent="center">
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={dotaHeroes}
        keyExtractor={item => item.heroPath}
        contentContainerStyle={styles.flatlistContainer}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const heroCharacter = fetchHeroCharacter(item.heroPath);
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          return (
            <>
              {index === 0 && <ViewBox width={SPACER_ITEM_SIZE} />}
              <ViewBox width={ITEM_SIZE}>
                <Animated.View
                  style={[styles.animatedView, {transform: [{translateY}]}]}>
                  <ImageBox
                    height={CARD_HEIGHT - 100}
                    width={CARD_HEIGHT - 100}
                    source={{uri: heroCharacter}}
                    resizeMode="contain"
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
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 34,
  },
  flatlistContainer: {
    alignItems: 'center',
  },
});
