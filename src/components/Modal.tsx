import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ViewBox} from '../ui';
import Icon from '../ui/icons';
import {screenProportion} from '../utils/Metrics';

export default function DotaModal() {
  const {goBack} = useNavigation();

  return (
    <ViewBox
      alignItems="center"
      justifyContent="flex-end"
      bgColor="rgba(0, 0, 0, 0.23)"
      flex={1}>
      <ViewBox
        width={screenProportion('FULL_WIDTH')}
        height={screenProportion('HEIGHT', 0.7) + 16}
        bgColor={Colors.darker}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        alignItems="center"
        justifyContent="center">
        <Icon
          path="close"
          position="absolute"
          top={16}
          right={16}
          size={24}
          touchable
          onIconPress={goBack}
        />
      </ViewBox>
    </ViewBox>
  );
}
