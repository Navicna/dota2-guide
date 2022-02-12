import {css} from 'styled-components/native';
import {getCssValue} from '../utils';

export interface PaddingMixin {
  p: number | string;
  pl: number | string;
  pr: number | string;
  pt: number | string;
  pb: number | string;
  ph: number | string;
  pv: number | string;
}

export const paddingMixin = css<Partial<PaddingMixin>>`
  ${({p}) => p && `padding: ${getCssValue(p)}px`};
  ${({pl}) => pl && `padding-left: ${getCssValue(pl)}`};
  ${({pr}) => pr && `padding-right: ${getCssValue(pr)}`};
  ${({pt}) => pt && `padding-top: ${getCssValue(pt)}`};
  ${({pb}) => pb && `padding-bottom: ${getCssValue(pb)}`};

  ${({ph}) =>
    ph &&
    `padding-left: ${getCssValue(ph)};
     padding-right:${getCssValue(ph)};
`};

  ${({pv}) =>
    pv &&
    `padding-bottom: ${getCssValue(pv)};
     padding-top: ${getCssValue(pv)};
`};
`;
