import React from 'react';
import {ViewBox} from '../ui';

export default function Diamond({
  actived,
  size = 16,
}: {
  actived: boolean;
  size?: number;
}) {
  return (
    <ViewBox
      bgColor="white"
      mr={12}
      width={size}
      height={size}
      borderWidth={1}
      borderColor="white"
      transform={[{rotate: '45deg'}]}
      opacity={actived ? 1 : 0.36}
    />
  );
}
