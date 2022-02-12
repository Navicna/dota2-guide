import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';
import {TextBox, ViewBox} from '../../ui';
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
    <ViewBox
      alignItems="center"
      pt={16}
      height={screenProportion('HEIGHT', 0.18)}
      justifyContent="center">
      <TextBox mb={8} fontSize={20}>
        {'FILTRAR HERÓIS'}
      </TextBox>

      {/* Complexity and Attributes filter */}

      <ViewBox flexDirection="row" width={230} justifyContent="space-around">
        <HeroComplexityFilter />
        <HeroAttributeFilter />
      </ViewBox>

      {/* Hero Search Component */}
      <ViewBox flexDirection="row" marginBottom={16} marginTop={8}>
        <ViewBox
          width={40}
          height={40}
          alignItems="center"
          justifyContent="center"
          borderTopLeftRadius={4}
          borderBottomLeftRadius={4}
          backgroundColor="#111111">
          <Icon name="search" size={32} color="#808080" />
        </ViewBox>
        <ViewBox
          width={200}
          height={40}
          borderTopRightRadius={4}
          borderBottomRightRadius={4}
          bgColor="#111111"
          justifyContent="center"
          alignItems="center">
          <TextInput
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchText}
            placeholderTextColor="white"
            selectionColor="white"
            style={styles.textInput}
          />
        </ViewBox>
      </ViewBox>
    </ViewBox>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#808080',
    height: 30,
    width: 184,
    paddingLeft: 8,
    color: 'white',
    paddingVertical: 8,
  },
});
