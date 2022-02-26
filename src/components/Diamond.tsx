import React from 'react';
import {ViewBox} from '../ui';

export default function Diamond({
  bgColor,
  size = 16,
}: {
  bgColor: string;
  size?: number;
}) {
  return (
    <ViewBox
      bgColor={bgColor}
      mr={12}
      width={size}
      height={size}
      borderWidth={1}
      borderColor="white"
      transform={[{rotate: '45deg'}]}
    />
  );
}
