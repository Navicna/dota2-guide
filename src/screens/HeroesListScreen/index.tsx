import React from 'react';
import {FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  } = useSearchHeroFilters();

  if (dotaHeroesLoading) {
    return <LoadingScreen />;
  }

  return (
    <ViewBox bgColor={Colors.darker} alignItems="center" pl={8} flex={1}>
      <FlatList
        data={filteredDotaHeroes}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HeroListHeader
            searchText={searchText}
            onChangeText={text => handleSearchHeroes(text)}
          />
        }
        ListEmptyComponent={
          <ViewBox flex={1} alignItems="center">
            <TextBox textAlign="center" fontSize={16}>
              {'Nenhum herói\n\ncorresponde aos filtros'}
            </TextBox>
          </ViewBox>
        }
        renderItem={({item}) => {
          return (
            <HeroPicture
              heroDetails={item}
              filteredDotaHeroes={filteredDotaHeroes}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </ViewBox>
  );
}
