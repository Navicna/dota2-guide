import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TextBox, ViewBox} from '../../ui';

export function InvisibleHeader() {
  const {goBack} = useNavigation();

  return (
    <ViewBox position="absolute" top={16} left={16}>
      <TouchableOpacity onPress={goBack}>
        <ViewBox
          borderColor="white"
          alignItems="center"
          justifyContent="center">
          <TextBox fontSize={20}>Back</TextBox>
        </ViewBox>
      </TouchableOpacity>
    </ViewBox>
  );
}
