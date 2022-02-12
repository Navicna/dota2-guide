import {css} from 'styled-components/native';
import {getCssValue} from '../utils';

export interface MarginMixin {
  m: number | string;
  ml: number | string;
  mr: number | string;
  mt: number | string;
  mb: number | string;
  mh: number | string;
  mv: number | string;
}

export const marginMixin = css<Partial<MarginMixin>>`
  ${({m}) => m && `margin: ${getCssValue(m)}px`};
  ${({ml}) => ml && `margin-left: ${getCssValue(ml)}`};
  ${({mr}) => mr && `margin-right: ${getCssValue(mr)}`};
  ${({mt}) => mt && `margin-top: ${getCssValue(mt)}`};
  ${({mb}) => mb && `margin-bottom: ${getCssValue(mb)}`};

  ${({mh}) =>
    mh &&
    `margin-left: ${getCssValue(mh)};
     margin-right:${getCssValue(mh)};
`};
  ${({mv}) =>
    mv &&
    `margin-bottom: ${getCssValue(mv)};
     margin-top: ${getCssValue(mv)};
`};
`;
