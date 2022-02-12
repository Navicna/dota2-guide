import React from 'react';
import styled from 'styled-components/native';
import {marginMixin, MarginMixin} from './mixins/margin';
import {paddingMixin, PaddingMixin} from './mixins/padding';
import {parseDescription} from './utils';

type FontStyle = 'light' | 'regular' | 'bold' | 'semi_bold';

const FONT_SIZE_PATTERN = 14;

const fontTypes = (type: FontStyle) =>
  ({
    light: {
      fontFamily: 'OpenSans-Light',
    },
    regular: {
      fontFamily: 'OpenSans-Regular',
    },
    bold: {
      fontFamily: 'OpenSans-SemiBold',
    },
    semi_bold: {
      fontFamily: 'OpenSans-Bold',
    },
  }[type]);

export type TextProps = Partial<
  {
    fontSize?: number;
    color?: string;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    fontStyle?: FontStyle;
  } & MarginMixin &
    PaddingMixin
>;

export const TextBox = styled.Text<TextProps>`
  ${marginMixin}
  ${paddingMixin}
  font-size: ${({fontSize}) => fontSize || FONT_SIZE_PATTERN};
  color: ${({color}) => color || 'white'};
  letter-spacing: ${({letterSpacing}) => letterSpacing || 0};

  ${({lineHeight}) => lineHeight && `line-height: ${lineHeight || 0}`};
  ${({textAlign}) => textAlign && `text-align: ${textAlign}`};

  font-family: ${({fontStyle}) => {
    const fontWeight = fontStyle ? fontTypes(fontStyle) : undefined;
    return fontWeight ? fontWeight.fontFamily : fontTypes('regular').fontFamily;
  }};
`;

export const TextWithSepOperator: React.FC<
  TextProps & {
    transformTo?: FontStyle;
    matchedTextProps?: TextProps;
  }
> = ({children, matchedTextProps, transformTo, ...props}) => {
  if (typeof children !== 'string') {
    return <TextBox {...props}>{children}</TextBox>;
  }

  const textArray = parseDescription(children);

  return (
    <TextBox {...props}>
      {textArray.map(({text, match}, index) => {
        const passProps = Object.assign(
          {},
          props,
          match ? matchedTextProps : {},
        );
        const fontStyle = match ? transformTo || 'bold' : 'regular';

        return (
          <TextBox {...passProps} fontStyle={fontStyle} key={index}>
            {text}
          </TextBox>
        );
      })}
    </TextBox>
  );
};
