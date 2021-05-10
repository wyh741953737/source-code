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

let IcongengduoMore: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M384 832a63.9488 63.9488 0 0 1-45.2608-109.2608l211.5584-211.5584-203.52-210.7392A64.0512 64.0512 0 0 1 438.8864 211.456l247.1424 256a64 64 0 0 1-0.768 89.7536l-256 256a63.8464 63.8464 0 0 1-45.2608 18.7392"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IcongengduoMore.defaultProps = {
  size: 18,
};

IcongengduoMore = React.memo ? React.memo(IcongengduoMore) : IcongengduoMore;

export default IcongengduoMore;
