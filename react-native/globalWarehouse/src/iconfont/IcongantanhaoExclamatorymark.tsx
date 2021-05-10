/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IcongantanhaoExclamatorymark: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M445.44 908.8a64 64 0 1 0 128 0 64 64 0 0 0-128 0"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M445.44 768m0-64l0-588.8q0-64 64-64l0 0q64 0 64 64l0 588.8q0 64-64 64l0 0q-64 0-64-64Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IcongantanhaoExclamatorymark.defaultProps = {
  size: 18,
};

IcongantanhaoExclamatorymark = React.memo
  ? React.memo(IcongantanhaoExclamatorymark)
  : IcongantanhaoExclamatorymark;

export default IcongantanhaoExclamatorymark;
