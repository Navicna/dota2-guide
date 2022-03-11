import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {Images} from '../../assets/image';
import {
  PICTURE_HEIGHT,
  PICTURE_MARGIN_BOTTOM,
} from '../../components/HeroPicture';

import {HeroListHeader, HeroPicture} from '../../components/index';

import {useSearchHeroFilters} from '../../hooks/index';
import {ViewBox, TextBox} from '../../ui';

import {LoadingScreen} from '../LoadingScreen';

export function HeroesListScreen() {
  const {
    filteredDotaHeroes,
    dotaHeroesLoading,
    searchText,
    handleSearchHeroes,
    fadeAnimation,
  } = useSearchHeroFilters();
  const {navigate} = useNavigation();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  if (dotaHeroesLoading) {
    return <LoadingScreen />;
  }

  function handleNavigate(position: number) {
    navigate('HeroDetails' as never, {filteredDotaHeroes, position} as never);
  }

  return (
    <ImageBackground
      style={styles.imageBackgroundStyle}
      source={{uri: Images.heroCharacterBgUri}}>
      <HeroListHeader
        searchText={searchText}
        onChangeText={text => handleSearchHeroes(text)}
      />
      <Animated.View style={[styles.animatedView, {opacity: fadeAnimation}]}>
        <Animated.FlatList
          data={filteredDotaHeroes}
          contentContainerStyle={styles.flatListContainer}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          ListEmptyComponent={
            <ViewBox flex={1} alignItems="center">
              <TextBox textAlign="center" fontSize={16}>
                {'Nenhum herói\n\ncorresponde aos filtros'}
              </TextBox>
            </ViewBox>
          }
          numColumns={1}
          renderItem={({item, index}) => {
            const inputRange = [
              -1,
              0,
              (PICTURE_HEIGHT + PICTURE_MARGIN_BOTTOM) * index,
              (PICTURE_HEIGHT + PICTURE_MARGIN_BOTTOM) * (index + 1),
            ];
            const opacityInputRange = [
              -1,
              0,
              (PICTURE_HEIGHT + PICTURE_MARGIN_BOTTOM) * index,
              (PICTURE_HEIGHT + PICTURE_MARGIN_BOTTOM) * (index + 0.5),
            ];
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0.5],
            });

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0.5],
            });
            return (
              <TouchableOpacity onPress={() => handleNavigate(index)}>
                <HeroPicture
                  animatedViewStyle={{scale, opacity}}
                  position={index}
                  filteredDotaHeroes={filteredDotaHeroes}
                  heroDetails={item}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {flex: 1, alignItems: 'center'},
  flatListContainer: {
    paddingTop: 24,
  },
  animatedView: {flex: 1},
});
