import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeroPicture} from '../../components/HeroPicture';
import {useDotaGuide} from '../../context/DotaGuideContext';
import {LoadingScreen} from '../LoadingScreen';

export function HeroesListScreen() {
  const {dotaHeroes, dotaHeroesLoading} = useDotaGuide();

  if (dotaHeroesLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={dotaHeroes}
        numColumns={3}
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
  },
});
