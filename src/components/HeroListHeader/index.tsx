import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {screenProportion} from '../../utils/Metrics';
import {HeroAttributeFilter} from '../HeroAttributeFilter/HeroAttributeFilter';

import {HeroComplexityFilter} from '../HeroComplexityFilter';

interface HeroListHeaderProps {
  onChangeText(text: string): void;
  searchText: string;
}

export function HeroListHeader({
  onChangeText,
  searchText,
}: HeroListHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.copleFiltersContainer}>
        <HeroComplexityFilter />
        <HeroAttributeFilter />
      </View>

      {/* Hero Search Component */}
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={28} color="#808080" />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchText}
            placeholderTextColor="white"
            selectionColor="white"
            style={styles.textInput}
            placeholder="Escolha o seu Herói"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  copleFiltersContainer: {
    flexDirection: 'row',
    width: 230,
    justifyContent: 'space-around',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 16,
    height: screenProportion('HEIGHT', 0.18),
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#808080',
    height: 30,
    width: 184,
    paddingLeft: 8,
    color: 'white',
    paddingVertical: 8,
  },
  searchContainer: {flexDirection: 'row', marginBottom: 16, marginTop: 8},
  iconContainer: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#111111',
  },
  textInputContainer: {
    width: 200,
    height: 40,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
