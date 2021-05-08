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

let IconjiantouxiaoXia: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M192 384a63.9488 63.9488 0 0 1 109.2608-45.2608l211.5584 211.5072 210.7392-203.52a64.0512 64.0512 0 0 1 88.9344 92.1088l-256 247.1936a64 64 0 0 1-89.7024-0.768l-256-256A63.8464 63.8464 0 0 1 192 384"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantouxiaoXia.defaultProps = {
  size: 18,
};

IconjiantouxiaoXia = React.memo
  ? React.memo(IconjiantouxiaoXia)
  : IconjiantouxiaoXia;

export default IconjiantouxiaoXia;
