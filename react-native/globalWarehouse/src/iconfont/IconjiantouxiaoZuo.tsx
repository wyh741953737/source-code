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

let IconjiantouxiaoZuo: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M640 192a63.9488 63.9488 0 0 1 45.2608 109.2608l-211.5584 211.5072 203.52 210.7392a64.0512 64.0512 0 0 1-92.0576 88.9856l-247.1936-256a64 64 0 0 1 0.768-89.7536l256-256c12.4928-12.4928 28.8768-18.7392 45.2608-18.7392"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantouxiaoZuo.defaultProps = {
  size: 18,
};

IconjiantouxiaoZuo = React.memo
  ? React.memo(IconjiantouxiaoZuo)
  : IconjiantouxiaoZuo;

export default IconjiantouxiaoZuo;
