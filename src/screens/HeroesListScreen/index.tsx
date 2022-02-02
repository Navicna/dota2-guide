import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {HeroListHeader} from '../../components/HeroListHeader';
import {HeroPicture} from '../../components/HeroPicture';
import {useDotaGuide} from '../../context/DotaGuideContext';
import {DotaHeroesInterfaceUpdated} from '../../interfaces/heroes.interfaces';
import {getHeroComplexitySearchFilter} from '../../redux/dota.selectors';
import {LoadingScreen} from '../LoadingScreen';

export function HeroesListScreen() {
  const {dotaHeroes, dotaHeroesLoading} = useDotaGuide();
  const [searchText, setSearchText] = useState('');
  const [filteredDotaHeroes, setFilteredDotaHeroes] = useState(dotaHeroes);
  const heroComplexitySearchFilter = useSelector(getHeroComplexitySearchFilter);

  useEffect(() => {
    const filterByComplexity = dotaHeroes.filter(
      ({heroComplexity}: DotaHeroesInterfaceUpdated) => {
        return heroComplexitySearchFilter === heroComplexity;
      },
    );
    if (heroComplexitySearchFilter > 0) {
      setFilteredDotaHeroes(filterByComplexity);
    } else {
      setFilteredDotaHeroes(dotaHeroes);
    }
  }, [heroComplexitySearchFilter]);

  const handleSearchHeroes = (text: string) => {
    if (text) {
      const filteredHeroes = dotaHeroes.filter(
        ({heroName, heroComplexity}: DotaHeroesInterfaceUpdated) => {
          if (heroComplexitySearchFilter > 0) {
            return (
              heroName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              heroComplexitySearchFilter === heroComplexity
            );
          }
          return heroName.toLowerCase().indexOf(text.toLowerCase()) > -1;
        },
      );

      setFilteredDotaHeroes(filteredHeroes);
      setSearchText(text);
    } else {
      setFilteredDotaHeroes(dotaHeroes);
      setSearchText(text);
    }
  };

  if (dotaHeroesLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredDotaHeroes.length === 0 ? dotaHeroes : filteredDotaHeroes}
        numColumns={3}
        ListHeaderComponent={
          <HeroListHeader
            searchText={searchText}
            onChangeText={text => handleSearchHeroes(text)}
          />
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
});
