import React from 'react';
import {ViewBox} from '../../ui';

export function Diamond({bgColor}: {bgColor: string}) {
  return (
    <ViewBox
      bgColor={bgColor}
      mr={12}
      width={16}
      height={16}
      borderWidth={1}
      borderColor="white"
      transform={[{rotate: '45deg'}]}
    />
  );
}
