import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';
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
      <Text style={styles.title}>{'FILTRAR HERÓIS'}</Text>

      {/* Complexity and Attributes filter */}
      <View style={styles.copleFiltersContainer}>
        <HeroComplexityFilter />
        <HeroAttributeFilter />
      </View>

      {/* Hero Search Component */}
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={32} color="#808080" />
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
    marginBottom: 8,
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
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
    width: 40,
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
