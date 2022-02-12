import {css} from 'styled-components/native';
import {getCssValue} from '../utils';

export interface PositionedMixin {
  top: number | string;
  bottom: number | string;
  left: number | string;
  right: number | string;

  position: 'absolute' | 'relative';
}

export const positionedMixin = css<Partial<PositionedMixin>>`
  ${({position}) => position && `position: ${position}`};
  ${({top}) => top && `top: ${getCssValue(top)}`};
  ${({bottom}) => bottom && `bottom: ${getCssValue(bottom)}`};
  ${({left}) => left && `left: ${getCssValue(left)}`};
  ${({right}) => right && `right: ${getCssValue(right)}`};
`;
