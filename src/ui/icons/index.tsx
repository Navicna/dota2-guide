import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const getIcons = (path: string, size = 32, color = 'white') =>
  ({
    chevron_back: <Ionicons name="chevron-back" size={size} color={color} />,
    chevron_forward: (
      <Ionicons name="chevron-forward" size={size} color={color} />
    ),
    search: <EvilIcons name="search" size={size} color={color} />,
    back_screen: <AntDesign name="back" size={size} color={color} />,
  }[path]);

export default function Icon({
  path,
  size,
  color,
}: {
  path: string;
  size?: number;
  color?: string;
}) {
  return !path ? null : <>{getIcons(path, size, color)}</>;
}
