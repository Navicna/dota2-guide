import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextBox, ViewBox} from '../ui';
import Icon from '../ui/icons';

export default function InvisibleHeader() {
  const {goBack} = useNavigation();
  const {top: SAFE_AREA_TOP_VALUE} = useSafeAreaInsets();

  return (
    <ViewBox position="absolute" top={SAFE_AREA_TOP_VALUE + 8} left={16}>
      <TouchableOpacity onPress={goBack}>
        <ViewBox
          borderColor="white"
          alignItems="center"
          justifyContent="center">
          <ViewBox>
            <Icon path="back_screen" size={20} />
            <TextBox fontSize={12}>Back</TextBox>
          </ViewBox>
        </ViewBox>
      </TouchableOpacity>
    </ViewBox>
  );
}
