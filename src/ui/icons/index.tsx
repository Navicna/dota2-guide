import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ViewBox from '../ViewBox';
import {TouchableOpacity} from 'react-native';

const getIcons = (path: string, size = 32, color = 'white') =>
  ({
    chevron_back: <Ionicons name="chevron-back" size={size} color={color} />,
    chevron_forward: (
      <Ionicons name="chevron-forward" size={size} color={color} />
    ),
    search: <EvilIcons name="search" size={size} color={color} />,
    back_screen: <AntDesign name="back" size={size} color={color} />,
    music_on: <MaterialIcons name="music-note" size={size} color={color} />,
    music_off: <MaterialIcons name="music-off" size={size} color={color} />,
    sound: <AntDesign name="sound" size={size} color={color} />,
    close: <AntDesign name="close" size={size} color={color} />,
  }[path]);

export default function Icon({
  path,
  size,
  color,
  touchable = false,
  onIconPress,
  ...props
}: {
  path: string;
  size?: number;
  color?: string;
  touchable?: boolean;
  onIconPress?: () => void;
} & any) {
  return (
    <ViewBox {...props}>
      {touchable ? (
        <TouchableOpacity onPress={touchable ? onIconPress : () => {}}>
          {getIcons(path, size, color)}
        </TouchableOpacity>
      ) : (
        getIcons(path, size, color)
      )}
    </ViewBox>
  );
}
