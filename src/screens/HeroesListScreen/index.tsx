import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {HeroListHeader} from '../../components/HeroListHeader';
import {HeroPicture} from '../../components/HeroPicture';

import {useSearchHeroFilters} from '../../hooks/useSearchHeroFilters';

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
    <View style={styles.screen}>
      <FlatList
        data={filteredDotaHeroes}
        numColumns={3}
        ListHeaderComponent={
          <HeroListHeader
            searchText={searchText}
            onChangeText={text => handleSearchHeroes(text)}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {'Nenhum herói\n\ncorresponde aos filtros'}
            </Text>
          </View>
        }
        renderItem={({item}) => {
          return <HeroPicture heroDetails={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.darker,
    paddingLeft: 8,
    paddingBottom: 48,
    flex: 1,
  },
  emptyContainer: {flex: 1, alignItems: 'center'},
  emptyText: {color: 'white', textAlign: 'center', fontSize: 16},
});
