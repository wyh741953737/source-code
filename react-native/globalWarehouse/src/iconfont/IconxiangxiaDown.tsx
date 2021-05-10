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

let IconxiangxiaDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M120.32 192.512A51.2 51.2 0 0 1 181.76 110.7968l5.12 3.8912 326.2976 278.6816 323.8912-278.5792a51.2 51.2 0 0 1 67.6864 0.8192l4.5056 4.608a51.2 51.2 0 0 1-0.8192 67.6864l-4.608 4.5056-357.12 307.2a51.2 51.2 0 0 1-61.6448 3.8912l-5.0176-3.7888-359.6288-307.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M120.32 602.112a51.2 51.2 0 0 1 61.3888-81.7152l5.12 3.8912 326.2976 278.6816 323.8912-278.5792a51.2 51.2 0 0 1 67.6864 0.8192l4.5056 4.608a51.2 51.2 0 0 1-0.8192 67.6864l-4.608 4.5056-357.12 307.2a51.2 51.2 0 0 1-61.6448 3.8912l-5.0176-3.7888-359.6288-307.2z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconxiangxiaDown.defaultProps = {
  size: 18,
};

IconxiangxiaDown = React.memo ? React.memo(IconxiangxiaDown) : IconxiangxiaDown;

export default IconxiangxiaDown;
