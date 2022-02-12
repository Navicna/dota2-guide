import styled from 'styled-components/native';

import {FlexStyle, FlexAlignType} from 'react-native';

import {FlexMixin, flexMixin} from './mixins/flex';
import {marginMixin, MarginMixin} from './mixins/margin';
import {paddingMixin, PaddingMixin} from './mixins/padding';
import {positionedMixin, PositionedMixin} from './mixins/positioned';

export type ViewBoxProps = Partial<{
  bgColor: string;

  overflow: 'visible' | 'hidden' | 'scroll';

  height: number | string;
  maxWidth: number | string;
  minHeight: number | string;
  maxHeight: number | string;
  width: number | string;

  alignItems: FlexAlignType;
  justifyContent: FlexStyle['justifyContent'];

  borderRadius: number | string;
  zIndex: number;
  opacity: number;
  borderWidth: number;
  borderColor: string;
  aspectRatio: number;
}> &
  MarginMixin &
  PaddingMixin &
  PositionedMixin &
  FlexMixin;

export const ViewBox = styled.View<ViewBoxProps | any>`
  ${({bgColor}) => bgColor && `background-color: ${bgColor}`};
  ${({opacity}) => opacity && `opacity: ${opacity}`};

  ${({overflow}) => overflow && `overflow: ${overflow}`};

  ${({width}) => `width: ${width}`};
  ${({maxWidth}) => maxWidth && `max-width: ${maxWidth}`};
  ${({height}) => height && `height: ${height}`};
  ${({minHeight}) => minHeight && `min-height: ${minHeight}`};

  ${({alignItems}) => alignItems && `align-items: ${alignItems}`};
  ${({justifyContent}) =>
    justifyContent && `justify-content: ${justifyContent}`};

  ${({borderRadius}) => borderRadius && `border-radius: ${borderRadius}`};
  ${({borderWidth}) => borderWidth && `border-width: ${borderWidth}`};
  ${({borderColor}) => borderColor && `border-color: ${borderColor}`};
  ${({zIndex}) => zIndex && `z-index: ${zIndex}`};

  ${marginMixin}
  ${paddingMixin}
  ${positionedMixin}
  ${flexMixin}
`;
