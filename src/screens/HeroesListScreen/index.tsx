import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Images} from '../../assets/image';
import {PICTURE_WIDTH} from '../../components/HeroPicture';

import {HeroListHeader, HeroPicture} from '../../components/index';

import {useSearchHeroFilters} from '../../hooks/index';
import {ViewBox, TextBox, ImageBox} from '../../ui';

import {LoadingScreen} from '../LoadingScreen';
const PICTURE_HEIGHT = PICTURE_WIDTH / 3;

export function HeroesListScreen() {
  const {
    filteredDotaHeroes,
    dotaHeroesLoading,
    searchText,
    handleSearchHeroes,
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
      style={{flex: 1}}
      source={{uri: Images.heroCharacterBgUri}}>
      <HeroListHeader
        searchText={searchText}
        onChangeText={text => handleSearchHeroes(text)}
      />
      <Animated.FlatList
        data={filteredDotaHeroes}
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
            (PICTURE_HEIGHT + 8) * index,
            (PICTURE_HEIGHT + 8) * (index + 1),
          ];
          const opacityInputRange = [
            -1,
            0,
            (PICTURE_HEIGHT + 8) * index,
            (PICTURE_HEIGHT + 8) * (index + 0.5),
          ];
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <TouchableOpacity onPress={() => handleNavigate(index)}>
              <Animated.View
                style={{opacity, borderRadius: 10, transform: [{scale}]}}>
                <ImageBox
                  source={{
                    uri: item.heroImage,
                  }}
                  height={PICTURE_HEIGHT}
                  width={PICTURE_WIDTH}
                  mb={8}
                  ml={8}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </ImageBackground>
  );
}
