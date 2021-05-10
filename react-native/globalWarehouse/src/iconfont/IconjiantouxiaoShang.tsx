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

let IconjiantouxiaoShang: FunctionComponent<Props> = ({
  size,
  color,
  ...rest
}) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M832 640a63.9488 63.9488 0 0 1-109.2608 45.2608L511.232 473.6512l-210.7904 203.52a64.0512 64.0512 0 0 1-88.9344-92.1088l256-247.1424a64 64 0 0 1 89.7024 0.768l256 256c12.4928 12.4416 18.7904 28.8256 18.7904 45.2096"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconjiantouxiaoShang.defaultProps = {
  size: 18,
};

IconjiantouxiaoShang = React.memo
  ? React.memo(IconjiantouxiaoShang)
  : IconjiantouxiaoShang;

export default IconjiantouxiaoShang;
